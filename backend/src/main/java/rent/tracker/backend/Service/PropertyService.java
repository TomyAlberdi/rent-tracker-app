package rent.tracker.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import rent.tracker.backend.DTO.Property.CreatePropertyDTO;
import rent.tracker.backend.DTO.Property.PropertyDTO;
import rent.tracker.backend.Entity.Property;
import rent.tracker.backend.Entity.Group;
import rent.tracker.backend.Mapper.PropertyMapper;
import rent.tracker.backend.Repository.GroupRepository;
import rent.tracker.backend.Repository.PropertyRepository;

@Service
@AllArgsConstructor
public class PropertyService {
    
    private final PropertyRepository propertyRepository;
    private final GroupRepository groupRepository;
    
    public PropertyDTO createProperty(CreatePropertyDTO dto) {
        Group group = resolveGroup(dto.getGroupId());
        Property property = PropertyMapper.toEntity(dto, group);
        return PropertyMapper.toDTO(propertyRepository.save(property));
    }
    
    public PropertyDTO getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Property not found with ID: " + id));
        return PropertyMapper.toDTO(property);
    }
    
    public PropertyDTO updateProperty(Long id, CreatePropertyDTO dto) {
        Property existing = propertyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Property not found with ID: " + id));
        
        Group group = resolveGroup(dto.getGroupId());
        PropertyMapper.updateFromDTO(existing, dto, group);
        
        return PropertyMapper.toDTO(propertyRepository.save(existing));
    }
    
    public void deleteProperty(Long id) {
        if (!propertyRepository.existsById(id)) {
            throw new EntityNotFoundException("Property not found with ID: " + id);
        }
        propertyRepository.deleteById(id);
    }
    
    private Group resolveGroup(Long groupId) {
        if (groupId == null) return null;
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found with ID: " + groupId));
    }
    
}
