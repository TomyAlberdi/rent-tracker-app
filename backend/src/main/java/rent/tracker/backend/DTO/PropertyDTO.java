package rent.tracker.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rent.tracker.backend.Entity.Property;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PropertyDTO {
    private Long id;
    private String name;
    private String description;
    private Property.PropertyType type;
    private Long groupId;
}
