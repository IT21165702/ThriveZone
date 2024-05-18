package dev.paf.Thrivezone.repository;

import dev.paf.Thrivezone.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
    // Add custom query methods if needed
}

