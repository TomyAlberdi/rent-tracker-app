package rent.tracker.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rent.tracker.backend.DTO.CreatePropertyDTO;
import rent.tracker.backend.DTO.PropertyDTO;
import rent.tracker.backend.Entity.Property;
import rent.tracker.backend.Repository.PropertyRepository;
import rent.tracker.backend.Service.PropertyService;

@RestController
@RestControllerAdvice
@RequestMapping("/property")
@RequiredArgsConstructor
public class PropertyController {
    
    private final PropertyService propertyService;
    private final PropertyRepository propertyRepository;
    
    @GetMapping
    public ResponseEntity<?> getIndividualProperties() {
        return ResponseEntity.ok(propertyRepository.findByTypeAndGroupIsNull(Property.PropertyType.INDIVIDUAL));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getIndividualProperty(@PathVariable Long id) {
        try {
            PropertyDTO property = propertyService.getPropertyById(id);
            return ResponseEntity.ok(property);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<?> addProperty(@RequestBody CreatePropertyDTO dto) {
        return ResponseEntity.ok(propertyService.createProperty(dto));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProperty(
            @PathVariable Long id,
            @RequestBody CreatePropertyDTO dto
    ) {
        try {
            PropertyDTO property = propertyService.updateProperty(id, dto);
            return ResponseEntity.ok(property);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id) {
        try {
            propertyService.deleteProperty(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
}
