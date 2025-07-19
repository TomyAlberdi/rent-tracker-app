package rent.tracker.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateRecordDTO {
    
    private Long propertyId;
    private Integer month;
    private Integer year;
    private Double income;
    
}
