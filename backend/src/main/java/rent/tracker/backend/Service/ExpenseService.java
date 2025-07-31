package rent.tracker.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rent.tracker.backend.DTO.Expense.CreateExpenseDTO;
import rent.tracker.backend.DTO.Expense.ExpenseDTO;
import rent.tracker.backend.Entity.Expense;
import rent.tracker.backend.Entity.MonthlyRecord;
import rent.tracker.backend.Mapper.ExpenseMapper;
import rent.tracker.backend.Repository.ExpenseRepository;
import rent.tracker.backend.Repository.MonthlyRecordRepository;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ExpenseService {
    
    private final ExpenseRepository expenseRepository;
    private final MonthlyRecordRepository monthlyRecordRepository;
    
    public List<ExpenseDTO> getByRecord(Long recordId) {
        MonthlyRecord record = monthlyRecordRepository.findById(recordId)
                .orElseThrow(() -> new EntityNotFoundException("Monthly Record not found with ID: " + recordId));
        List<Expense> expenses = expenseRepository.findByRecord(record);
        return expenses.stream()
                .map(ExpenseMapper::toDTO)
                .toList();
    }
    
    @Transactional
    public List<ExpenseDTO> attachExpenses(List<CreateExpenseDTO> expenses, Long recordId) {
        if (expenses == null || expenses.isEmpty()) {
            return Collections.emptyList();
        }
        MonthlyRecord record = monthlyRecordRepository.findById(recordId)
                .orElseThrow(() -> new EntityNotFoundException("Monthly Record not found with ID: " + recordId));
        expenseRepository.deleteByRecordId(recordId);
        List<Expense> newExpenses = ExpenseMapper.toEntity(expenses, record);
        List<Expense> savedExpenses = expenseRepository.saveAll(newExpenses);
        return ExpenseMapper.toDTO(savedExpenses);
    }
    
}
