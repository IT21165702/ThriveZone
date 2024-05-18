import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, styled } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import PostDetail from './PostDetails'; // Import the PostDetail component

const CustomListItem = styled(ListItem)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
    marginRight: theme.spacing(2),
}));

const CustomImage = styled('img')({
    width: '50%',
    height: 'auto',
    marginLeft: '25%',
    borderRadius: '4px', // Adjust the border radius as needed
}); 


function PostList() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedPost(null);
        setIsDialogOpen(false);
    };

    const handleLikeClick = async (postId) => {
        try {
            // Send a request to the server to increment the likes count
            await axios.post(`http://localhost:8080/api/posts/${postId}/like`);
            // Update the local state to reflect the incremented likes count
            setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
        } catch (error) {
            console.error('Error adding like:', error);
        }
    };

    return (
        <div>
            <List>
                {posts.map(post => (
                    <CustomListItem key={post.id} button onClick={() => handlePostClick(post)}>
                        <ListItemAvatar>
                            <CustomAvatar alt={post.username} src={post.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={post.username}
                            secondary={
                                <React.Fragment>
                                    <Typography variant="body1">{post.content}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(post.createdAt).toLocaleString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })}
                                    </Typography>
                                    <IconButton edge="start" onClick={() => handleLikeClick(post.id)}>
                                        <Favorite />
                                    </IconButton>
                                    <Typography variant="body2" color="textSecondary">{post.likes}</Typography>
                                </React.Fragment>
                            }
                        />
                        <CustomImage src={post.images} alt="Post Image" />
                    </CustomListItem>
                ))}
            </List>

            {posts.length === 0 && (
                <Typography variant="body2" color="textSecondary" align="center">
                    No posts available.
                </Typography>
            )}

            {/* Dialog for displaying post details */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogTitle>Post Details</DialogTitle>
                <DialogContent>
                    <PostDetail post={selectedPost} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PostList;
