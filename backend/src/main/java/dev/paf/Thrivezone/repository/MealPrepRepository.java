package dev.paf.Thrivezone.repository;
import dev.paf.Thrivezone.model.MealPrepModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPrepRepository extends MongoRepository<MealPrepModel , String> {


}
