import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreatePost from '../Posts/CreatePost';

const Navigation = () => {
    const navigate = useNavigate();

    // State to control dialog visibility
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Handle navigation
    const handleNavigation = (path) => {
        if (path === '/profile') {
            navigate('/userprofile'); // Navigate to UserProfilePage
        } else {
            navigate(path);
        }
    };

    // Handle button click to open dialog
    const handleCreatePostClick = () => {
        setIsDialogOpen(true);
    };

    // Handle closing the dialog
    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="h-screen sticky top-0 bg-gray-100 px-4 py-6 flex flex-col justify-between">
            {/* Logo at the top */}
            <div className="mb-8">
                <img
                    src="/images/thrivezone.jpg" // Path to your logo image
                    alt="Logo"
                    className="w-full" // Full width logo
                />
            </div>

            {/* Navigation menu */}
            <div className="space-y-4">
                <div
                    className="flex items-center space-x-3 cursor-pointer py-2 px-2 hover:bg-gray-200 rounded-md"
                    onClick={() => handleNavigation('/home')}
                >
                    <HomeIcon className="text-gray-600" />
                    <span className="text-lg">Home</span>
                </div>
                <div
                    className="flex items-center space-x-3 cursor-pointer py-2 px-2 hover:bg-gray-200 rounded-md"
                    onClick={() => handleNavigation('/workout-plans')}
                >
                    <FitnessCenterIcon className="text-gray-600" />
                    <span className="text-lg">Workouts</span>
                </div>
                <div
                    className="flex items-center space-x-3 cursor-pointer py-2 px-2 hover:bg-gray-200 rounded-md"
                    onClick={() => handleNavigation('/meal-plans')}
                >
                    <RestaurantMenuIcon className="text-gray-600" />
                    <span className="text-lg">Meal Plans</span>
                </div>
                <div
                    className="flex items-center space-x-3 cursor-pointer py-2 px-2 hover:bg-gray-200 rounded-md"
                    onClick={() => handleNavigation('/notifications')}
                >
                    <NotificationsIcon className="text-gray-600" />
                    <span className="text-lg">Notifications</span>
                </div>
                <div
                    className="flex items-center space-x-3 cursor-pointer py-2 px-2 hover:bg-gray-200 rounded-md"
                    onClick={() => handleNavigation('/profile')}
                >
                    <AccountCircleIcon className="text-gray-600" />
                    <span className="text-lg">Profile</span>
                </div>
            </div>

            {/* Buttons section */}
            <div className="py-10">
                {/* Create Post Button */}
                <Button
                    onClick={handleCreatePostClick}
                    className="w-full py-3 rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                    Create Post
                </Button>
            </div>

            {/* Dialog to display CreatePost component */}
            <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="md">
                <CreatePost onClose={handleDialogClose} />
            </Dialog>
        </div>
    );
};

export default Navigation;