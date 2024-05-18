import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, Grid, Avatar, Divider, IconButton } from '@mui/material';
import { FavoriteBorder, Favorite, Comment } from '@mui/icons-material';
import axios from 'axios';

function PostDetails({ post, onUpdatePost }) {
    const [newComment, setNewComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);

    const handleLikePost = async () => {
        try {
            await axios.post(`http://localhost:8080/api/posts/${post.id}/like`);
            onUpdatePost(); // Update the post to reflect the new likes count
            setIsLiked(!isLiked); // Toggle the like state
        } catch (error) {
            console.error('Error liking post:', error);
            // Handle error
        }
    };

    const handleAddComment = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/posts/${post.id}/comments`, { text: newComment });
            onUpdatePost(response.data); // Update the post with the new comments
            setNewComment(''); // Clear the comment input field
        } catch (error) {
            console.error('Error adding comment:', error);
            // Handle error
        }
    };

    return (
        <div>
            {post && (
                <Card variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={2}>
                                <Avatar alt={post.username} src={post.avatar} />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h6" component="div">
                                    {post.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(post.createdAt).toLocaleString()}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={handleLikePost}>
                                    {isLiked ? <Favorite color="primary" /> : <FavoriteBorder color="primary" />}
                                </IconButton>
                                <IconButton disabled>
                                    <Comment color="primary" />
                                    <Typography variant="body2" color="text.secondary">
                                        {post.comments ? post.comments.length : 0} {/* Add a check for post.comments */}
                                    </Typography>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="body1" gutterBottom>
                            {post.content}
                        </Typography>
                        {post.images && (
                            <img src={post.images} alt="Post media" style={{ width: '100%', borderRadius: '8px', marginTop: '16px' }} />
                        )}
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="body2" gutterBottom>
                            <strong>Likes:</strong> {post.likes}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Comments:</strong> 
                            {post.comments && post.comments.map((comment, index) => (
                                <div key={index}>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>{comment.username}</strong>: {comment.text}
                                    </Typography>
                                </div>
                            ))}
                        </Typography>
                        {/* Comment input field */}
                        <TextField
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            label="Add a comment"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        {/* Button to add comment */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddComment}
                            sx={{ marginTop: '8px' }}
                        >
                            Add Comment
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default PostDetails;
