package rent.tracker.backend.Mapper;

import rent.tracker.backend.DTO.Record.CreateRecordDTO;
import rent.tracker.backend.Model.Record;

public class RecordMapper {
    
    public static Record toEntity(CreateRecordDTO dto) {
        Record record = new Record();
        updateFromDTO(record, dto);
        return record;
    }
    
    public static CreateRecordDTO toDTO(Record record) {
        CreateRecordDTO dto = new CreateRecordDTO();
        dto.setId(record.getId());
        dto.setType(record.getType());
        dto.setParentId(record.getParentId());
        dto.setMonth(record.getMonth());
        dto.setYear(record.getYear());
        dto.setTransactions(record.getTransactions());
        return dto;
    }
    
    public static void updateFromDTO(Record record, CreateRecordDTO dto) {
        record.setType(dto.getType());
        record.setParentId(dto.getParentId());
        record.setMonth(dto.getMonth());
        record.setYear(dto.getYear());
        record.setTransactions(dto.getTransactions());
    }
    
}
