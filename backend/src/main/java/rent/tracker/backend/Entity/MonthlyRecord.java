package rent.tracker.backend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.YearMonth;
import java.util.List;

@Getter
@Setter
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    private YearMonth month;
    
    private Double income;
    
    private Double netIncome;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;
    
    @OneToMany(mappedBy = "monthlyRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Expense> expenses;
}
