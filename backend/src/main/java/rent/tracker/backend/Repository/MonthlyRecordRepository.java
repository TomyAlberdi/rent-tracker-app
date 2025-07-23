package rent.tracker.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Entity.Property;

import java.util.List;
import java.util.Optional;

public interface MonthlyRecordRepository extends JpaRepository<MonthlyRecord, Long> {
    Optional<MonthlyRecord> findByPropertyAndMonthAndYear(Property property, int month, int year);
    List<MonthlyRecord> findByPropertyAndYear(Property property, int year);
}
