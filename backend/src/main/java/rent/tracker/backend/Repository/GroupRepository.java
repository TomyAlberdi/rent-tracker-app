package rent.tracker.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rent.tracker.backend.Entity.Group;
import rent.tracker.backend.View.GroupDropdownView;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    List<GroupDropdownView> findAllBy();
}
