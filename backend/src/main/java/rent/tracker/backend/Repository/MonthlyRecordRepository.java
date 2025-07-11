package rent.tracker.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Entity.Property;

import java.util.List;

@Repository
public interface MonthlyRecordRepository extends JpaRepository<MonthlyRecord, Long> {
    List<MonthlyRecord> findByProperty(Property property);
}
