package rent.tracker.backend.DTO.Group;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rent.tracker.backend.View.IndividualPropertiesView;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LightGroupWithPropertiesDTO {
    private Long id;
    private String name;
    private List<IndividualPropertiesView> properties;
}
