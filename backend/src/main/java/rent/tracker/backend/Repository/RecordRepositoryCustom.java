package rent.tracker.backend.Repository;

public interface RecordRepositoryCustom {
    void updateParentNameByParentId(String parentId, String newParentName);
}