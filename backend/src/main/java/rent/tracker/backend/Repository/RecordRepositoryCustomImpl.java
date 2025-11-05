package rent.tracker.backend.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

@Component
public class RecordRepositoryCustomImpl implements RecordRepositoryCustom {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void updateParentNameByParentId(String parentId, String newParentName) {
        Query query = new Query(Criteria.where("parentId").is(parentId));
        Update update = new Update().set("parentName", newParentName);
        mongoTemplate.updateMulti(query, update, "record");
    }
}