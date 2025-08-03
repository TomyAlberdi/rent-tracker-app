package rent.tracker.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Entity.Property;

import java.util.List;
import java.util.Optional;

@Repository
public interface MonthlyRecordRepository extends JpaRepository<MonthlyRecord, Long> {
    Optional<MonthlyRecord> findByPropertyIdAndMonthAndYear(Long propertyId, Integer month, Integer year);
    List<MonthlyRecord> findByPropertyAndYear(Property property, int year);
}
