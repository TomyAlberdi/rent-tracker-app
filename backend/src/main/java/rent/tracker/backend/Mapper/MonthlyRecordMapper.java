package rent.tracker.backend.Mapper;

import rent.tracker.backend.DTO.RecordDTO;
import rent.tracker.backend.Entity.Group;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Entity.Property;

public class MonthlyRecordMapper {
    
    public static RecordDTO toDTO(MonthlyRecord record) {
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
        return dto;
    }
    
}
