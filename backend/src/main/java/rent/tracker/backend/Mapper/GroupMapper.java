package rent.tracker.backend.Mapper;

import rent.tracker.backend.DTO.Group.CreateGroupDTO;
import rent.tracker.backend.DTO.Group.GroupDTO;
import rent.tracker.backend.Entity.Group;

import java.util.stream.Collectors;

public class GroupMapper {
    
    public static GroupDTO toDTO(Group pg) {
        GroupDTO dto = new GroupDTO();
        dto.setId(pg.getId());
        dto.setName(pg.getName());
        dto.setDescription(pg.getDescription());
        if (pg.getProperties() != null) {
            dto.setProperties(
                    pg.getProperties().stream()
                            .map(PropertyMapper::toDTO)
                            .collect(Collectors.toList())
            );
        }
        return dto;
    }
    
    public static Group toEntity(CreateGroupDTO dto) {
        Group pg = new Group();
        updateFromDTO(pg, dto);
        return pg;
    }
    
    public static void updateFromDTO(Group group, CreateGroupDTO dto) {
        group.setName(dto.getName());
        group.setDescription(dto.getDescription());
    }
    
}
