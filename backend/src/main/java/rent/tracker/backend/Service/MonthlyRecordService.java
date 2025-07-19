package rent.tracker.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Entity.Property;
import rent.tracker.backend.Repository.MonthlyRecordRepository;
import rent.tracker.backend.Repository.PropertyRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class MonthlyRecordService {
    
    private final MonthlyRecordRepository monthlyRecordRepository;
    private final PropertyRepository propertyRepository;
    
    public List<MonthlyRecord> getByPropertyAndYear(Long propertyId, int year) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new EntityNotFoundException("Property not found with ID: " + propertyId));
        return monthlyRecordRepository.findByPropertyAndYear(property, year);
    }
    
    @Transactional
    public MonthlyRecord create(Long propertyId, MonthlyRecord record) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new EntityNotFoundException("Property not found with ID: " + propertyId));
        boolean exists = monthlyRecordRepository
                .findByPropertyAndMonthAndYear(property, record.getMonth(), record.getYear())
                .isPresent();
        if (exists) {
            throw new IllegalStateException("A record already exists for this property, month, and year.");
        }
        record.setProperty(property);
        return monthlyRecordRepository.save(record);
    }
    
    @Transactional
    public MonthlyRecord update(Long id, MonthlyRecord updatedRecord) {
        MonthlyRecord existing = monthlyRecordRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MonthlyRecord not found with ID: " + id));
        
        existing.setMonth(updatedRecord.getMonth());
        existing.setYear(updatedRecord.getYear());
        existing.setIncome(updatedRecord.getIncome());
        existing.setNetIncome(updatedRecord.getNetIncome());
        // Do not allow changing the property once set, or add logic if needed
        
        return monthlyRecordRepository.save(existing);
    }
    
}
