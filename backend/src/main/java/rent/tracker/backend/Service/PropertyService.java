package rent.tracker.backend.Service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import rent.tracker.backend.DTO.Property.CreatePropertyDTO;
import rent.tracker.backend.Exception.ResourceNotFoundException;
import rent.tracker.backend.Mapper.PropertyMapper;
import rent.tracker.backend.Model.Property;
import rent.tracker.backend.Repository.GroupRepository;
import rent.tracker.backend.Repository.PropertyRepository;

@Service
@AllArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final GroupRepository groupRepository;

    public Property createProperty(CreatePropertyDTO dto) {
        if (!groupRepository.existsById(dto.getGroupId())) {
            throw new ResourceNotFoundException("Group not found with ID: " + dto.getGroupId());
        }
        Property property = PropertyMapper.toEntity(dto);
        return propertyRepository.save(property);
    }

    public Property getPropertyById(String id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with ID: " + id));
    }

    public Property updateProperty(String id, CreatePropertyDTO dto) {
        Property existing = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with ID: " + id));
        if (!groupRepository.existsById(dto.getGroupId())) {
            throw new ResourceNotFoundException("Group not found with ID: " + dto.getGroupId());
        }
        PropertyMapper.updateFromDTO(existing, dto);
        return propertyRepository.save(existing);
    }

    public void deleteProperty(String id) {
        if (!propertyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Property not found with ID: " + id);
        }
        propertyRepository.deleteById(id);
    }

}
