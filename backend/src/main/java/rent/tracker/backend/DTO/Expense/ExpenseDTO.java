package rent.tracker.backend.DTO.Expense;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseDTO {
    
    private Long id;
    private Long recordId;
    private String title;
    private String description;
    private Double amount;
    private Integer share;
    
}
