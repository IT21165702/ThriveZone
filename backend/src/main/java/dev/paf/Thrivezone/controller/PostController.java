package dev.paf.Thrivezone.controller;

import dev.paf.Thrivezone.model.Post;
import dev.paf.Thrivezone.model.Comment;
import dev.paf.Thrivezone.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        Post post = postService.getPostById(id);
        if (post != null) {
            return ResponseEntity.ok(post);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Post> addPost(@RequestBody Post post) {
        Post createdPost = postService.addPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody Post post) {
        Post updatedPost = postService.updatePost(id, post);
        if (updatedPost != null) {
            return ResponseEntity.ok(updatedPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Post> likePost(@PathVariable String postId) {
        Post likedPost = postService.likePost(postId);
        if (likedPost != null) {
            return ResponseEntity.ok(likedPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{postId}/unlike")
    public ResponseEntity<Post> unlikePost(@PathVariable String postId) {
        Post unlikedPost = postService.unlikePost(postId);
        if (unlikedPost != null) {
            return ResponseEntity.ok(unlikedPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{postId}/comment")
    public ResponseEntity<Post> addComment(@PathVariable String postId, @RequestBody Comment comment) {
        Post commentedPost = postService.addComment(postId, comment);
        if (commentedPost != null) {
            return ResponseEntity.ok(commentedPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{postId}/comment/{commentId}")
    public ResponseEntity<Post> deleteComment(@PathVariable String postId, @PathVariable String commentId) {
        Post updatedPost = postService.deleteComment(postId, commentId);
        if (updatedPost != null) {
            return ResponseEntity.ok(updatedPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
