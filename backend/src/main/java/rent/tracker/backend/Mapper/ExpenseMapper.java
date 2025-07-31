package rent.tracker.backend.Mapper;

import rent.tracker.backend.DTO.Expense.CreateExpenseDTO;
import rent.tracker.backend.DTO.Expense.ExpenseDTO;
import rent.tracker.backend.Entity.Expense;
import rent.tracker.backend.Entity.MonthlyRecord;

import java.util.ArrayList;
import java.util.List;

public class ExpenseMapper {
    
    public static ExpenseDTO toDTO(Expense expense) {
        MonthlyRecord record = expense.getRecord();
        ExpenseDTO dto = new ExpenseDTO();
        dto.setId(expense.getId());
        dto.setRecordId(record.getId());
        dto.setTitle(expense.getTitle());
        dto.setDescription(expense.getDescription());
        dto.setAmount(expense.getAmount());
        dto.setShare(expense.getShare());
        return dto;
    }
    
    public static Expense toEntity(CreateExpenseDTO dto, MonthlyRecord record) {
        Expense expense = new Expense();
        updateFromDTO(expense, dto, record);
        return expense;
    }
    
    public static void updateFromDTO(Expense expense, CreateExpenseDTO dto, MonthlyRecord record) {
        expense.setTitle(dto.getTitle());
        expense.setDescription(dto.getDescription());
        expense.setAmount(dto.getAmount());
        expense.setShare(dto.getShare());
        expense.setRecord(record);
    }
    
    public static List<ExpenseDTO> toDTO(List<Expense> expenses) {
        return expenses.stream()
                .map(ExpenseMapper::toDTO)
                .toList();
    }
    
    public static List<Expense> toEntity(List<CreateExpenseDTO> dtos, MonthlyRecord record) {
        return dtos.stream()
                .map(dto -> ExpenseMapper.toEntity(dto, record))
                .toList();
    }
    
}
