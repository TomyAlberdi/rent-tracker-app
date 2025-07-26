package rent.tracker.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rent.tracker.backend.DTO.Expense.CreateExpenseDTO;
import rent.tracker.backend.Entity.Expense;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Mapper.ExpenseMapper;
import rent.tracker.backend.Repository.ExpenseRepository;
import rent.tracker.backend.Repository.MonthlyRecordRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class ExpenseService {
    
    private final ExpenseRepository expenseRepository;
    private final MonthlyRecordRepository monthlyRecordRepository;
    
    public List<Expense> getByRecord(Long recordId) {
        MonthlyRecord record = monthlyRecordRepository.findById(recordId)
                .orElseThrow(() -> new EntityNotFoundException("Monthly Record not found with ID: " + recordId));
        return expenseRepository.findByRecord(record);
    }
    
    @Transactional
    public Expense create(CreateExpenseDTO expense) {
        MonthlyRecord record = monthlyRecordRepository.findById(expense.getRecordId())
                .orElseThrow(() -> new EntityNotFoundException("Monthly Record not found with ID: " + expense.getRecordId()));
        Expense newExpense = ExpenseMapper.toEntity(expense, record);
        return expenseRepository.save(newExpense);
    }
    
    @Transactional
    public Expense update(Long id, CreateExpenseDTO expense) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Expense not found with ID: " + id));
        ExpenseMapper.updateFromDTO(existing, expense, existing.getRecord());
        return expenseRepository.save(existing);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new EntityNotFoundException("Expense not found with ID: " + id);
        }
        expenseRepository.deleteById(id);
    }
    
}
