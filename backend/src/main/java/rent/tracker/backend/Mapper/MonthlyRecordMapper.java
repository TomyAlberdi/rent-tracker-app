package rent.tracker.backend.Mapper;

import rent.tracker.backend.DTO.Expense.ExpenseDTO;
import rent.tracker.backend.DTO.MonthlyRecord.CreateRecordDTO;
import rent.tracker.backend.DTO.MonthlyRecord.RecordDTO;
import rent.tracker.backend.Entity.Group;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Entity.Property;

import java.util.List;

public class MonthlyRecordMapper {
    
    public static RecordDTO toDTO(MonthlyRecord record, List<ExpenseDTO> expenses) {
        Property p = record.getProperty();
        Group g = p.getGroup();
        RecordDTO dto = new RecordDTO();
        dto.setId(record.getId());
        dto.setPropertyId(p.getId());
        dto.setPropertyName(p.getName());
        dto.setGroupId(g != null ? g.getId() : null);
        dto.setGroupName(g != null ? g.getName() : null);
        dto.setMonth(record.getMonth());
        dto.setYear(record.getYear());
        dto.setIncome(record.getIncome());
        dto.setNetIncome(record.getNetIncome());
        dto.setExpenses(expenses);
        return dto;
    }
    
    public static MonthlyRecord toEntity(CreateRecordDTO dto, Property property) {
        MonthlyRecord record = new MonthlyRecord();
        updateFromDTO(record, dto, property);
        return record;
    }
    
    public static void updateFromDTO(MonthlyRecord record, CreateRecordDTO dto, Property property) {
        record.setProperty(property);
        record.setMonth(dto.getMonth());
        record.setYear(dto.getYear());
        record.setIncome(dto.getIncome());
    }
    
    public static List<RecordDTO> toDTO(List<MonthlyRecord> records, List<ExpenseDTO> expenses) {
        return records.stream()
                .map(record -> MonthlyRecordMapper.toDTO(record, expenses))
                .toList();
    }
    
}
