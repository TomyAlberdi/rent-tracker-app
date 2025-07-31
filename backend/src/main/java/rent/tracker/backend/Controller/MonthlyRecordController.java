package rent.tracker.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rent.tracker.backend.DTO.MonthlyRecord.CreateRecordDTO;
import rent.tracker.backend.DTO.MonthlyRecord.RecordDTO;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Mapper.MonthlyRecordMapper;
import rent.tracker.backend.Service.MonthlyRecordService;

import java.util.List;

@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class MonthlyRecordController {
    
    private final MonthlyRecordService monthlyRecordService;
    
    @GetMapping
    public ResponseEntity<?> getByPropertyAndYear(
            @RequestParam Long propertyId,
            @RequestParam int year
    ) {
        return ResponseEntity.ok(monthlyRecordService.getByPropertyAndYear(propertyId, year));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateRecordDTO record) {
        MonthlyRecord monthlyRecord = monthlyRecordService.create(record);
        RecordDTO recordDTO = MonthlyRecordMapper.toDTO(monthlyRecord);
        return ResponseEntity.ok(recordDTO);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        monthlyRecordService.delete(id);
        return ResponseEntity.ok().build();
    }
    
    
}
