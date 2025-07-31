package rent.tracker.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rent.tracker.backend.Entity.Expense;
import rent.tracker.backend.Entity.MonthlyRecord;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    void deleteByRecordId(Long recordId);
    List<Expense> findByRecord(MonthlyRecord record);
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.record.id = :recordId")
    Double sumExpensesByRecordId(@Param("recordId") Long recordId);
}
