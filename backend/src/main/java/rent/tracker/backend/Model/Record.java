package rent.tracker.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "records")
public class Record {

    @Id
    private String id;
    private Property.PropertyType type;
    private String parentId;
    private Integer month;
    private Integer year;
    private List<Transaction> transactions;
    private Double totalIncome;
    private Double totalExpense;
    private Double netIncome;
    
}
