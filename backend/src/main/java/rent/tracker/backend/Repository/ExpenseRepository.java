package rent.tracker.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rent.tracker.backend.Entity.Expense;
import rent.tracker.backend.Entity.MonthlyRecord;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Optional<Expense> findByRecordId(Long recordId);
    List<Expense> findByRecord(MonthlyRecord record);
}
