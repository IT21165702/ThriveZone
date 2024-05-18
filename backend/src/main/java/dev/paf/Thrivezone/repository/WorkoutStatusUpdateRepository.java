package dev.paf.Thrivezone.repository;

import dev.paf.Thrivezone.model.WorkoutStatusUpdate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkoutStatusUpdateRepository extends MongoRepository<WorkoutStatusUpdate, String> {
    // Add custom query methods if needed
}
