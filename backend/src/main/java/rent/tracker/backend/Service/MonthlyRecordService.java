package rent.tracker.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rent.tracker.backend.DTO.MonthlyRecord.CreateRecordDTO;
import rent.tracker.backend.Entity.Expense;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Entity.Property;
import rent.tracker.backend.Mapper.MonthlyRecordMapper;
import rent.tracker.backend.Repository.ExpenseRepository;
import rent.tracker.backend.Repository.MonthlyRecordRepository;
import rent.tracker.backend.Repository.PropertyRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class MonthlyRecordService {
    
    private final MonthlyRecordRepository monthlyRecordRepository;
    private final PropertyRepository propertyRepository;
    private final ExpenseRepository expenseRepository;
    
    public List<MonthlyRecord> getByPropertyAndYear(Long propertyId, int year) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new EntityNotFoundException("Property not found with ID: " + propertyId));
        return monthlyRecordRepository.findByPropertyAndYear(property, year);
    }
    
    @Transactional
    public MonthlyRecord create(CreateRecordDTO record) {
        Property property = propertyRepository.findById(record.getPropertyId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Property not found with ID: " + record.getPropertyId()));
        boolean exists = monthlyRecordRepository
                .findByPropertyIdAndMonthAndYear(record.getPropertyId(), record.getMonth(), record.getYear())
                .isPresent();
        if (exists) {
            throw new IllegalStateException("A record already exists for this property, month, and year.");
        }
        MonthlyRecord newRecord = MonthlyRecordMapper.toEntity(record, property);
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
        monthlyRecordRepository.deleteById(id);
    }
    
    public Double calculateNetIncome(Long recordId, Double income) {
        Double totalExpenses = expenseRepository.sumExpensesByRecordId(recordId);
        return income - totalExpenses;
    }
    
}
