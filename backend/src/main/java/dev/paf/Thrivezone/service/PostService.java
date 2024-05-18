package dev.paf.Thrivezone.service;

import dev.paf.Thrivezone.model.Post;
import dev.paf.Thrivezone.model.Comment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostService {

    private Map<String, Post> posts = new HashMap<>();

    public List<Post> getAllPosts() {
        return new ArrayList<>(posts.values());
    }

    public Post getPostById(String id) {
        return posts.get(id);
    }

    public Post addPost(Post post) {
        // Generate unique ID for the post
        String postId = String.valueOf(posts.size() + 1);
        post.setId(postId);
        // Add post to the map
        posts.put(postId, post);
        return post;
    }

    public Post updatePost(String id, Post updatedPost) {
        if (posts.containsKey(id)) {
            updatedPost.setId(id);
            posts.put(id, updatedPost);
            return updatedPost;
        } else {
            return null; // Post not found
        }
    }

    public void deletePost(String id) {
        posts.remove(id);
    }

    public Post likePost(String postId) {
        Post post = posts.get(postId);
        if (post != null) {
            post.setLikes(post.getLikes() + 1);
            return post;
        } else {
            return null; // Post not found
        }
    }

    public Post unlikePost(String postId) {
        Post post = posts.get(postId);
        if (post != null && post.getLikes() > 0) {
            post.setLikes(post.getLikes() - 1);
            return post;
        } else {
            return null; // Post not found or no likes to undo
        }
    }

    public Post addComment(String postId, Comment comment) {
        Post post = posts.get(postId);
        if (post != null) {
            List<Comment> comments = post.getComments();
            if (comments == null) {
                comments = new ArrayList<>();
            }
            comments.add(comment);
            post.setComments(comments);
            return post;
        } else {
            return null; // Post not found
        }
    }

    public Post deleteComment(String postId, String commentId) {
        Post post = posts.get(postId);
        if (post != null) {
            List<Comment> comments = post.getComments();
            if (comments != null) {
                comments.removeIf(comment -> comment.getId().equals(commentId));
                post.setComments(comments);
            }
            return post;
        } else {
            return null; // Post not found
        }
    }
}
