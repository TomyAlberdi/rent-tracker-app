package rent.tracker.backend.Mapper;

import rent.tracker.backend.DTO.CreatePropertyDTO;
import rent.tracker.backend.DTO.PropertyDTO;
import rent.tracker.backend.Entity.Property;
import rent.tracker.backend.Entity.Group;

public class PropertyMapper {
    
    public static PropertyDTO toDTO(Property property) {
        PropertyDTO dto = new PropertyDTO();
        dto.setId(property.getId());
        dto.setName(property.getName());
        dto.setDescription(property.getDescription());
        dto.setType(property.getType());
        dto.setGroupId(property.getGroup() != null ? property.getGroup().getId() : null);
        return dto;
    }
    
    public static Property toEntity(CreatePropertyDTO dto, Group group) {
        Property property = new Property();
        updateFromDTO(property, dto, group);
        return property;
    }
    
    public static void updateFromDTO(Property property, CreatePropertyDTO dto, Group group) {
        property.setName(dto.getName());
        property.setDescription(dto.getDescription());
        property.setType(dto.getType());
        property.setGroup(group);
    }
    
}
