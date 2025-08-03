package rent.tracker.backend.DTO.MonthlyRecord;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rent.tracker.backend.DTO.Expense.CreateExpenseDTO;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateRecordDTO {
    
    private Long propertyId;
    private Integer month;
    private Integer year;
    private Double income;
    private List<CreateExpenseDTO> expenses;
}
