package rent.tracker.backend.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "monthly_record", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"property_id", "month", "year"})
})
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;
    
    @NotNull
    @Min(1)
    @Column(nullable = false)
    private Integer month;
    
    @NotNull
    @Column(nullable = false)
    private Integer year;
    
    @NotNull
    @Min(0)
    private Double income;
    
    @NotNull
    private Double netIncome;
}
