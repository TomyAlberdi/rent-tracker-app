package rent.tracker.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rent.tracker.backend.DTO.Group.CreateGroupDTO;
import rent.tracker.backend.DTO.Group.GroupDTO;
import rent.tracker.backend.DTO.Group.LightGroupWithPropertiesDTO;
import rent.tracker.backend.Entity.Group;
import rent.tracker.backend.Entity.Property;
import rent.tracker.backend.Mapper.GroupMapper;
import rent.tracker.backend.Repository.GroupRepository;
import rent.tracker.backend.Repository.PropertyRepository;
import rent.tracker.backend.View.GroupDropdownView;
import rent.tracker.backend.View.IndividualPropertiesView;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class GroupService {
    
    private final GroupRepository groupRepository;
    private final PropertyRepository propertyRepository;
    
    public List<LightGroupWithPropertiesDTO> getAllGroupsWithProperties() {
        List<LightGroupWithPropertiesDTO> returnGroups = new ArrayList<>();
        List<GroupDropdownView> groups = groupRepository.findAllBy();
        groups.forEach(
                group -> {
                    List<IndividualPropertiesView> properties = propertyRepository.findLightByGroupId(group.getId());
                    LightGroupWithPropertiesDTO lightGroupWithPropertiesDTO = new LightGroupWithPropertiesDTO();
                    lightGroupWithPropertiesDTO.setId(group.getId());
                    lightGroupWithPropertiesDTO.setName(group.getName());
                    lightGroupWithPropertiesDTO.setProperties(properties);
                    returnGroups.add(lightGroupWithPropertiesDTO);
                }
        );
        return returnGroups;
    }
    
    @Transactional
    public GroupDTO createGroup(CreateGroupDTO dto) {
        Group group = GroupMapper.toEntity(dto);
        return GroupMapper.toDTO(groupRepository.save(group));
    }
    
    public GroupDTO getGroupById(Long id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Group not found with ID: " + id));
        return GroupMapper.toDTO(group);
    }
    
    @Transactional
    public GroupDTO updateGroup(Long id, CreateGroupDTO dto) {
        Group existing = groupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Group not found with ID: " + id));
        GroupMapper.updateFromDTO(existing, dto);
        return GroupMapper.toDTO(groupRepository.save(existing));
    }
    
    @Transactional
    public void deleteGroup(Long id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Group not found with ID: " + id));
        List<Property> properties = propertyRepository.findByGroupId(id);
        propertyRepository.deleteAll(properties);
        groupRepository.delete(group);
    }
    
    @Transactional
    public void addPropertyToGroup(Long groupId, Long propertyId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new EntityNotFoundException("Group not found with ID: " + groupId));
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new EntityNotFoundException("Property not found with ID: " + propertyId));
        property.setGroup(group);
        propertyRepository.save(property);
    }
    
    @Transactional
    public void removePropertyFromGroup(Long propertyId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new EntityNotFoundException("Property not found with ID: " + propertyId));
        property.setGroup(null);
        propertyRepository.save(property);
    }
    
}
