package rent.tracker.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rent.tracker.backend.Entity.Property;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
}
