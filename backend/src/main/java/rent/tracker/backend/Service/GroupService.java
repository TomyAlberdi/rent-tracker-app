package rent.tracker.backend.Service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rent.tracker.backend.DTO.Group.CreateGroupDTO;
import rent.tracker.backend.DTO.Group.GroupDTO;
import rent.tracker.backend.DTO.Group.LightGroupDTO;
import rent.tracker.backend.Exception.ResourceNotFoundException;
import rent.tracker.backend.Model.Group;
import rent.tracker.backend.Model.Property;
import rent.tracker.backend.Mapper.GroupMapper;
import rent.tracker.backend.Repository.GroupRepository;
import rent.tracker.backend.Repository.PropertyRepository;
import java.util.List;
import java.util.Properties;

@Service
@AllArgsConstructor
public class GroupService {
    
    private final GroupRepository groupRepository;
    private final PropertyRepository propertyRepository;
    
    public List<LightGroupDTO> getLightGroups() {
        return groupRepository.findAll()
                .stream()
                .map(g -> new LightGroupDTO(g.getId(), g.getName()))
                .toList();
    }
    
    public List<GroupDTO> getGroups() {
        return groupRepository.findAll()
                .stream()
                .map(g -> {
                    List<Property> properties = propertyRepository.findByGroupId(g.getId());
                    return GroupMapper.toDTO(g, properties);
                })
                .toList();
    }
    
    @Transactional
    public Group createGroup(CreateGroupDTO dto) {
        Group group = GroupMapper.toEntity(dto);
        return groupRepository.save(group);
    }
    
    public GroupDTO getGroupById(String id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found with ID: " + id));
        List<Property> properties = propertyRepository.findByGroupId(group.getId());
        return GroupMapper.toDTO(group, properties);
    }
    
    @Transactional
    public Group updateGroup(String id, CreateGroupDTO dto) {
        Group existing = groupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found with ID: " + id));
        GroupMapper.updateFromDTO(existing, dto);
        return groupRepository.save(existing);
    }
    
    @Transactional
    public void deleteGroup(String id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found with ID: " + id));
        groupRepository.delete(group);
    }
    
}
