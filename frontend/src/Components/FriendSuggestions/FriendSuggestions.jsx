import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, Button } from '@mui/material';

const FriendSuggestions = () => {
    // Define meaningful dummy friend suggestions
    const friendSuggestions = [
        {
            id: 1,
            name: 'John Doe',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            mutualFriends: 5, // Dummy data: number of mutual friends
        },
        {
            id: 2,
            name: 'Jane Smith',
            avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
            mutualFriends: 3, // Dummy data: number of mutual friends
        },
        {
            id: 3,
            name: 'Alice Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
            mutualFriends: 2, // Dummy data: number of mutual friends
        },
        {
            id: 4,
            name: 'Michael Brown',
            avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
            mutualFriends: 4, // Dummy data: number of mutual friends
        },
        {
            id: 5,
            name: 'Sarah Williams',
            avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
            mutualFriends: 6, // Dummy data: number of mutual friends
        },
        // Add more friend suggestions as needed
    ];

    return (
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
            {/* Title above the list of friend suggestions */}
            <Typography variant="h6" className="mb-4 text-gray-900 font-bold">
                Friend Suggestions
            </Typography>

            {/* List of friend suggestions */}
            <List>
                {friendSuggestions.map((friend) => (
                    <ListItem key={friend.id} className="flex justify-between items-center border-b pb-4 last:border-b-0">
                        {/* Profile image and text */}
                        <div className="flex items-center space-x-4">
                            <ListItemAvatar>
                                <Avatar src={friend.avatar} alt={friend.name} className="w-10 h-10" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={friend.name}
                                secondary={`${friend.mutualFriends} mutual friends`}
                                primaryTypographyProps={{ className: 'text-gray-900 font-semibold' }}
                                secondaryTypographyProps={{ className: 'text-gray-600' }}
                            />
                        </div>
                        {/* Add Friend button */}
                        <Button
                            variant="contained"
                            color="success"
                            size="small" // Add the size property to make the button small
                            className="text-white rounded-md"
                        >
                            Add Friend
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default FriendSuggestions;
