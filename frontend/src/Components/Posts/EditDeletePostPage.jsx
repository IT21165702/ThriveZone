import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import PostDetail from './PostDetails'; // Import the PostDetail component

function EditDeletePostPage() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setIsDetailDialogOpen(true);
    };

    const handleCloseDetailDialog = () => {
        setSelectedPost(null);
        setIsDetailDialogOpen(false);
    };

    const handleEditClick = (post) => {
        setSelectedPost(post);
        setEditedContent(post.content);
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setSelectedPost(null);
        setIsEditDialogOpen(false);
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:8080/api/posts/${selectedPost.id}`, { content: editedContent });
            setPosts(posts.map(post => post.id === selectedPost.id ? { ...post, content: editedContent } : post));
            handleCloseEditDialog();
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };

    const handleDeleteClick = async (postId) => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${postId}`);
            setPosts(posts.filter(post => post.id !== postId));
            handleCloseDetailDialog();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            <List>
                {posts.map(post => (
                    <ListItem key={post.id} button onClick={() => handlePostClick(post)}>
                        <ListItemText
                            primary={post.content}
                            secondary={post.username}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => handleEditClick(post)}>
                                <Edit />
                            </IconButton>
                            <IconButton edge="end" onClick={() => handleDeleteClick(post.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
                {posts.length === 0 && (
                    <Typography variant="body2" color="textSecondary" align="center">
                        No posts available.
                    </Typography>
                )}
            </List>

            {/* Dialog for displaying post details */}
            <Dialog open={isDetailDialogOpen} onClose={handleCloseDetailDialog} fullWidth maxWidth="md">
                <DialogTitle>Post Details</DialogTitle>
                <DialogContent>
                    <PostDetail post={selectedPost} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for editing post */}
            <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Edit Content"
                        multiline
                        rows={4}
                        fullWidth
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditSubmit} color="primary">
                        Save Changes
                    </Button>
                    <Button onClick={handleCloseEditDialog} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditDeletePostPage;
