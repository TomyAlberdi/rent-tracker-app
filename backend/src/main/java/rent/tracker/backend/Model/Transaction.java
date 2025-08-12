package rent.tracker.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    
    private String title;
    private String description;
    private Double amount;
    private TransactionType type;
    private String metaPropertyId;
    
    public enum TransactionType {
        INCOME,
        EXPENSE
    }
    
}
