package rent.tracker.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rent.tracker.backend.DTO.Expense.CreateExpenseDTO;
import rent.tracker.backend.DTO.Expense.ExpenseDTO;
import rent.tracker.backend.DTO.MonthlyRecord.CreateRecordDTO;
import rent.tracker.backend.DTO.MonthlyRecord.RecordDTO;
import rent.tracker.backend.Entity.Expense;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Entity.Property;
import rent.tracker.backend.Mapper.MonthlyRecordMapper;
import rent.tracker.backend.Repository.ExpenseRepository;
import rent.tracker.backend.Repository.MonthlyRecordRepository;
import rent.tracker.backend.Repository.PropertyRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MonthlyRecordService {
    
    private final ExpenseService expenseService;
    private final MonthlyRecordRepository monthlyRecordRepository;
    private final PropertyRepository propertyRepository;
    private final ExpenseRepository expenseRepository;
    
    public List<RecordDTO> getByPropertyAndYear(Long propertyId, int year) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new EntityNotFoundException("Property not found with ID: " + propertyId));
        List<MonthlyRecord> records = monthlyRecordRepository.findByPropertyAndYear(property, year);
        return records.stream()
                .map(record -> {
                    List<ExpenseDTO> expenses = expenseService.getByRecord(record.getId());
                    return MonthlyRecordMapper.toDTO(record, expenses);
                })
                .toList();
    }
    
    @Transactional
    public MonthlyRecord register(CreateRecordDTO record) {
        Property property = propertyRepository.findById(record.getPropertyId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Property not found with ID: " + record.getPropertyId()));
        Optional<MonthlyRecord> exists = monthlyRecordRepository.findByPropertyIdAndMonthAndYear(record.getPropertyId(), record.getMonth(), record.getYear());
        if (exists.isEmpty()) {
            MonthlyRecord newRecord = MonthlyRecordMapper.toEntity(record, property);
            expenseService.attachExpenses(record.getExpenses(), newRecord.getId());
            newRecord.setNetIncome(calculateNetIncome(newRecord.getId(), record.getIncome()));
        }
        
        newRecord.setNetIncome(calculateNetIncome(newRecord.getId(), newRecord.getIncome()));
        return monthlyRecordRepository.save(newRecord);
    }
    
    
    @Transactional
    public MonthlyRecord update(Long id, CreateRecordDTO record) {
        MonthlyRecord existing = monthlyRecordRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MonthlyRecord not found with ID: " + id));
        MonthlyRecordMapper.updateFromDTO(existing, record, existing.getProperty());
        existing.setNetIncome(calculateNetIncome(existing.getId(), existing.getNetIncome()));
        return monthlyRecordRepository.save(existing);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!monthlyRecordRepository.existsById(id)) {
            throw new EntityNotFoundException("MonthlyRecord not found with ID: " + id);
        }
        expenseRepository.deleteByRecordId(id);
        monthlyRecordRepository.deleteById(id);
    }
    
    public Double calculateNetIncome(Long recordId, Double income) {
        Double totalExpenses = expenseRepository.sumExpensesByRecordId(recordId);
        return income - totalExpenses;
    }
    
    public Double calculateNetIncome(List<CreateExpenseDTO> expenses, Double income) {
        Double totalExpenses = 0.0;
        for (CreateExpenseDTO expense : expenses) {
            totalExpenses = totalExpenses + expense.getAmount();
        }
        return income - totalExpenses;
    }
    
}
