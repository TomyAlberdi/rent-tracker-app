package rent.tracker.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rent.tracker.backend.DTO.Record.CreateRecordDTO;
import rent.tracker.backend.Model.Property;
import rent.tracker.backend.Service.RecordService;

@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {
    
    private final RecordService recordService;
    
    @GetMapping
    public ResponseEntity<?> getByPropertyAndYear(
            @RequestParam Property.PropertyType type,
            @RequestParam String parentId,
            @RequestParam int year
    ) {
        //TODO: make return by GROUPED also return all records of properties with the group ID
        return ResponseEntity.ok(recordService.getByParentIdAndYear(type, parentId, year));
    }

    @PostMapping
    public ResponseEntity<?> register(@RequestBody CreateRecordDTO record) {
        return ResponseEntity.ok(recordService.save(record));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        recordService.delete(id);
        return ResponseEntity.ok().build();
    }
    
    
}
