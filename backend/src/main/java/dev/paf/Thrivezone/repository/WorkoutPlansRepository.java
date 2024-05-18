package dev.paf.Thrivezone.repository;
import dev.paf.Thrivezone.model.WorkoutModel;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutPlansRepository extends MongoRepository<WorkoutModel , String> {


}
