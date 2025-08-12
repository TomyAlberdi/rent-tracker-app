package rent.tracker.backend.Service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rent.tracker.backend.DTO.Record.CreateRecordDTO;
import rent.tracker.backend.Exception.ResourceNotFoundException;
import rent.tracker.backend.Mapper.RecordMapper;
import rent.tracker.backend.Model.Group;
import rent.tracker.backend.Model.Property;
import rent.tracker.backend.Model.Record;
import rent.tracker.backend.Model.Transaction;
import rent.tracker.backend.Repository.GroupRepository;
import rent.tracker.backend.Repository.PropertyRepository;
import rent.tracker.backend.Repository.RecordRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RecordService {
    
    private final RecordRepository recordRepository;
    private final PropertyRepository propertyRepository;
    private final PropertyService propertyService;
    private final GroupRepository groupRepository;
    
    public List<Record> getByParentIdAndYear(Property.PropertyType type, String parentId, Integer year) {
        checkParentExists(type, parentId);
        return recordRepository.findAllByParentIdAndYear(parentId, year);
    }
    
    @Transactional
    public Record save(CreateRecordDTO recordDTO) {
        checkParentExists(recordDTO.getType(), recordDTO.getParentId());
        Record savedRecord;
        if (recordDTO.getId() == null) {
            Record newRecord = RecordMapper.toEntity(recordDTO);
            calculateAmounts(newRecord);
            savedRecord = recordRepository.save(newRecord);
        } else {
            Record record = recordRepository.findById(recordDTO.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Record with id " + recordDTO.getId() + " not found"));
            RecordMapper.updateFromDTO(record, recordDTO);
            calculateAmounts(record);
            savedRecord = recordRepository.save(record);
        }
        syncPropertyRecordToGroupRecord(savedRecord);
        return savedRecord;
    }
    
    @Transactional
    public void delete(String id) {
        Record record = recordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record with id " + id + " not found"));
        removePropertyRecordFromGroupRecord(record);
        recordRepository.delete(record);
    }
    
    private Transaction createSummaryTransaction(Transaction.TransactionType type, String propertyId, String propertyName, Double amount) {
        Transaction t = new Transaction();
        String prefix = (type == Transaction.TransactionType.INCOME) ? "INGRESOS" : "GASTOS";
        t.setTitle(prefix + " " + propertyName);
        t.setAmount(amount == null ? 0 : amount);
        t.setType(type);
        t.setMetaPropertyId(propertyId);
        return t;
    }
    
    @Transactional
    protected void syncPropertyRecordToGroupRecord(Record propertyRecord) {
        if (propertyRecord.getType() != Property.PropertyType.INDIVIDUAL) {
            return;
        }
        Property property = propertyService.getPropertyById(propertyRecord.getParentId());
        if (property.getGroupId() == null) {
            return; // Property is not part of a group, nothing to sync
        }
        
        Record groupRecord = recordRepository
                .findByTypeAndParentIdAndMonthAndYear(Property.PropertyType.GROUPED, property.getGroupId(), propertyRecord.getMonth(), propertyRecord.getYear())
                .orElseGet(() -> {
                    Record newGroupRecord = new Record();
                    newGroupRecord.setType(Property.PropertyType.GROUPED);
                    newGroupRecord.setParentId(property.getGroupId());
                    newGroupRecord.setYear(propertyRecord.getYear());
                    newGroupRecord.setMonth(propertyRecord.getMonth());
                    newGroupRecord.setTransactions(new ArrayList<>());
                    return newGroupRecord;
                });
        
        groupRecord.getTransactions()
                .removeIf(t -> property.getId().equals(t.getMetaPropertyId()));
        
        double income = sumAmounts(Transaction.TransactionType.INCOME, propertyRecord.getTransactions());
        double expenses = sumAmounts(Transaction.TransactionType.EXPENSE, propertyRecord.getTransactions());
        
        if (income > 0) {
            Transaction incomeSummary = createSummaryTransaction(Transaction.TransactionType.INCOME, property.getId(), property.getName(), income);
            groupRecord.getTransactions().add(incomeSummary);
        }
        
        if (expenses > 0) {
            Transaction expenseSummary = createSummaryTransaction(Transaction.TransactionType.EXPENSE, property.getId(), property.getName(), income);
            groupRecord.getTransactions().add(expenseSummary);
        }
        
        calculateAmounts(groupRecord);
        this.save(RecordMapper.toDTO(groupRecord));
    }
    
    @Transactional
    protected void removePropertyRecordFromGroupRecord(Record propertyRecord) {
        if (propertyRecord.getType() != Property.PropertyType.INDIVIDUAL) {
            return;
        }
        Property property = propertyService.getPropertyById(propertyRecord.getParentId());
        if (property.getGroupId() == null) {
            return;
        }
        
        Optional<Record> optionalGroupRecord = recordRepository
                .findByTypeAndParentIdAndMonthAndYear(Property.PropertyType.GROUPED, property.getGroupId(), propertyRecord.getMonth(), propertyRecord.getYear());
        if (optionalGroupRecord.isEmpty()) {
            return;
        }
        Record groupRecord = optionalGroupRecord.get();
        boolean removed = groupRecord.getTransactions()
                .removeIf(t -> property.getId().equals(t.getMetaPropertyId()));
        if (removed) {
            calculateAmounts(groupRecord);
            this.save(RecordMapper.toDTO(groupRecord));
        }
    }
    
    public void checkParentExists(Property.PropertyType type, String parentId) {
        if (type.equals(Property.PropertyType.GROUPED)) {
            Group group = groupRepository.findById(parentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Group with ID: " + parentId + " not found"));
        } else {
            Property property = propertyRepository.findById(parentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Property with ID: " + parentId + " not found"));
        }
    }
    
    public Double sumAmounts(Transaction.TransactionType type, List<Transaction> transactions) {
        Double total = 0.0;
        for (Transaction transaction : transactions) {
            if (transaction.getType().equals(type)) {
                total += transaction.getAmount();
            }
        }
        return total;
    }
    
    public void calculateAmounts(Record record) {
        Double totalIncome = sumAmounts(Transaction.TransactionType.INCOME, record.getTransactions());
        Double totalExpense = sumAmounts(Transaction.TransactionType.EXPENSE, record.getTransactions());
        Double netIncome = totalIncome - totalExpense;
        record.setTotalIncome(totalIncome);
        record.setTotalExpense(totalExpense);
        record.setNetIncome(netIncome);
    }
    
}
