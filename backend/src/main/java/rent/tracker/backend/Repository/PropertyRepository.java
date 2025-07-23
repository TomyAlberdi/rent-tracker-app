package rent.tracker.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rent.tracker.backend.Entity.Property;
import rent.tracker.backend.View.IndividualPropertiesView;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByGroupId(Long groupId);
    List<IndividualPropertiesView> findByTypeAndGroupIsNull(Property.PropertyType type);
    List<IndividualPropertiesView> findLightByGroupId(Long groupId);
}
