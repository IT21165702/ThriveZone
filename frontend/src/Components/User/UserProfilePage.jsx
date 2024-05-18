import React, { useState } from 'react';
import profileIcon from './user.jpg';
import Navigation from '../Navigation/Navigation';
import FriendSuggestions from '../FriendSuggestions/FriendSuggestions';
import WorkoutStatusForm from '../Workout_Status/WorkoutStatusForm';
import ViewWorkoutStatusPage from '../Workout_Status/ViewWorkoutStatusPage';
import { Dialog } from '@mui/material';
import EditDeletePostPage from '../Posts/EditDeletePostPage';

function UserProfilePage() {
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    const handleUpdateWorkoutStatus = () => {
        setIsUpdateDialogOpen(true);
    };

    const handleCloseUpdateDialog = () => {
        setIsUpdateDialogOpen(false);
    };

    const handleViewWorkoutStatus = () => {
        setIsViewDialogOpen(true);
    };

    const handleCloseViewDialog = () => {
        setIsViewDialogOpen(false);
    };

    return (
        <div className="flex justify-center">
            <div className="lg:w-1/4 lg:mr-6">
                <Navigation />
            </div>
            <div className="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                            <img className="w-20 h-20 rounded-full" src={profileIcon} alt="Profile" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Anna Smith</h2>
                        </div>
                    </div>
                    <div className="flex">
                        <button className="mr-2 px-2 py-1 bg-gray-300 text-gray-700 rounded cursor-pointer hover:bg-gray-400 text-sm">Edit</button>
                        <button className="px-2 py-1 bg-gray-300 text-gray-700 rounded cursor-pointer hover:bg-gray-400 text-sm">Settings</button>
                    </div>
                </div>
                <div className="flex justify-center mb-6">
                    <button onClick={handleUpdateWorkoutStatus} className="mr-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer font-bold">Update Workout Status</button>
                    <button onClick={handleViewWorkoutStatus} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer font-bold">View Workout Status</button>
                </div>
                <div className="bg-gray-200 rounded-lg p-4 text-center">
                    {/* Render user details */}
                    Posts
                    <EditDeletePostPage />
                </div>
                {/* Include the PostList component */}
                
            </div>
            <div className="lg:w-1/4 lg:ml-6">
                <FriendSuggestions />
            </div>
            <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
                <WorkoutStatusForm onClose={handleCloseUpdateDialog} />
            </Dialog>
            <Dialog open={isViewDialogOpen} onClose={handleCloseViewDialog}>
                <ViewWorkoutStatusPage onClose={handleCloseViewDialog} />
            </Dialog>
        </div>
    );
}

export default UserProfilePage;
