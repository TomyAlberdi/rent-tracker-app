package rent.tracker.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecordDTO {
    private Long id;
    private Long propertyId;
    private String propertyName;
    private Long groupId;
    private String groupName;
    private Integer month;
    private Integer year;
    private Double income;
    private Double netIncome;
}
