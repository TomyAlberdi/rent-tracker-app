package rent.tracker.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rent.tracker.backend.DTO.CreateGroupDTO;
import rent.tracker.backend.DTO.GroupDTO;
import rent.tracker.backend.Entity.Group;
import rent.tracker.backend.Entity.Property;
import rent.tracker.backend.Mapper.GroupMapper;
import rent.tracker.backend.Mapper.PropertyMapper;
import rent.tracker.backend.Repository.GroupRepository;
import rent.tracker.backend.Repository.PropertyRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GroupService {
    
    private final GroupRepository groupRepository;
    private final PropertyRepository propertyRepository;
    
    public List<GroupDTO> getAllGroupsWithProperties() {
        return groupRepository.findAll().stream()
                .map(GroupMapper::toDTO)
                .collect(Collectors.toList());
    }
    
    public GroupDTO createGroup(CreateGroupDTO dto) {
        Group group = GroupMapper.toEntity(dto);
        return GroupMapper.toDTO(groupRepository.save(group));
    }
    
    public GroupDTO getGroupById(Long id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Group not found with ID: " + id));
        return GroupMapper.toDTO(group);
    }
    
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
