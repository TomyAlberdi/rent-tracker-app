package rent.tracker.backend.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import rent.tracker.backend.Model.Record;

import java.util.List;

@Repository
public interface RecordRepository extends MongoRepository<Record, String> {
    List<Record> findAllByParentIdAndYear(String parentId, Integer year);
}
