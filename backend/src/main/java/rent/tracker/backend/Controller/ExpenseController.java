package rent.tracker.backend.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rent.tracker.backend.DTO.Expense.CreateExpenseDTO;
import rent.tracker.backend.DTO.Expense.ExpenseDTO;
import rent.tracker.backend.Entity.Expense;
import rent.tracker.backend.Mapper.ExpenseMapper;
import rent.tracker.backend.Service.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/expense")
@RequiredArgsConstructor
public class ExpenseController {
    
    private final ExpenseService expenseService;
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getByRecordId(@PathVariable Long id) {
        List<Expense> expenses = expenseService.getByRecord(id);
        List<ExpenseDTO> dtos = expenses.stream()
                .map(ExpenseMapper::toDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }
    
    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateExpenseDTO expense) {
        Expense newExpense = expenseService.create(expense);
        ExpenseDTO newExpenseDTO = ExpenseMapper.toDTO(newExpense);
        return ResponseEntity.ok(newExpenseDTO);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CreateExpenseDTO expense) {
        Expense newExpense = expenseService.update(id, expense);
        ExpenseDTO newExpenseDTO = ExpenseMapper.toDTO(newExpense);
        return ResponseEntity.ok(newExpenseDTO);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        expenseService.delete(id);
        return ResponseEntity.ok().build();
    }
    
}
