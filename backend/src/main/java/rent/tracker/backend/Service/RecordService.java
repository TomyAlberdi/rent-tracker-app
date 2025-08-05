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

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RecordService {
    
    private final RecordRepository recordRepository;
    private final PropertyRepository propertyRepository;
    private final GroupRepository groupRepository;
    
    public List<Record> getByParentIdAndYear(Property.PropertyType type, String parentId, Integer year) {
        checkParentExists(type, parentId);
        return recordRepository.findAllByParentIdAndYear(parentId, year);
    }
    
    @Transactional
    public Record save(CreateRecordDTO recordDTO) {
        checkParentExists(recordDTO.getType(), recordDTO.getParentId());
        if (recordDTO.getId() == null) {
            Record newRecord = RecordMapper.toEntity(recordDTO);
            calculateAmounts(newRecord);
            return recordRepository.save(newRecord);
        }
        Record record = recordRepository.findById(recordDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Record with id " + recordDTO.getId() + " not found"));
        RecordMapper.updateFromDTO(record, recordDTO);
        calculateAmounts(record);
        return recordRepository.save(record);
    }
    
    public void delete(String id) {
        Record record = recordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record with id " + id + " not found"));
        recordRepository.delete(record);
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
