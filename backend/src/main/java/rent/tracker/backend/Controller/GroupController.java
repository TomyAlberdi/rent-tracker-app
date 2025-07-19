package rent.tracker.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rent.tracker.backend.DTO.CreateGroupDTO;
import rent.tracker.backend.DTO.GroupDTO;
import rent.tracker.backend.Repository.GroupRepository;
import rent.tracker.backend.Service.GroupService;

@RestController
@RequestMapping("/group")
@RequiredArgsConstructor
public class GroupController {
    
    private final GroupService groupService;
    private final GroupRepository groupRepository;
    
    @GetMapping("/list/full")
    public ResponseEntity<?> getAllGroupsWithProperties() {
        return ResponseEntity.ok(groupService.getAllGroupsWithProperties());
    }
    
    @GetMapping("/list/light")
    public ResponseEntity<?> getDropdownGroups() {
        return ResponseEntity.ok(groupRepository.findAllBy());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getGroupById(@PathVariable Long id) {
        GroupDTO groupDTO = groupService.getGroupById(id);
        return ResponseEntity.ok(groupDTO);
    }
    
    @PostMapping
    public ResponseEntity<?> addGroup(@RequestBody CreateGroupDTO dto) {
        return ResponseEntity.ok(groupService.createGroup(dto));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateGroup(
            @PathVariable Long id,
            @RequestBody CreateGroupDTO dto
    ) {
        GroupDTO group = groupService.updateGroup(id, dto);
        return ResponseEntity.ok(group);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return ResponseEntity.ok().build();
    }
    
}
