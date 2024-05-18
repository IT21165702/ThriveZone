import React from 'react';
import { Grid } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import PostList from '../Posts/PostList';
import CreatePost from '../Posts/CreatePost';
import FriendSuggestions from '../FriendSuggestions/FriendSuggestions';
import PostDetails from '../Posts/PostDetails';
import UserProfilePage from '../User/UserProfilePage';
import WorkoutPlanCreationForm from '../WorkoutPlan/CreateWorkout';
import ViewWorkoutPlan from '../WorkoutPlan/ViewWorkoutPlan';
import MealPlanCreationForm from '../MealPlan/MealPlanCreationForm';
import ViewMealPlan from '../MealPlan/ViewMealPlan';

const HomePage = () => {
    return (
        <Grid container xs={12} className="h-screen">
            {/* Left navigation */}
            <Grid item xs={12} lg={2.5} className="hidden lg:block relative">
                <Navigation />
            </Grid>

            {/* Middle content area */}
            <Grid item xs={12} lg={7} className="relative">
                <Routes>
                    {/* Define routes */}
                    <Route path="/home" element={<PostList />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/post-list" element={<PostList />} />
                    <Route path="/posts/:postId" component={<PostDetails />} />
                    <Route path="/friend-suggestions" element={<FriendSuggestions />} />
                    <Route path="/home" element={<PostList />} />
                    <Route path="/userprofile" element={<UserProfilePage />} />  
                    <Route path="/workout-plan-creation" element={<WorkoutPlanCreationForm/>}/>
                    <Route path="/workout-plans" element={<ViewWorkoutPlan/>}/>
                    <Route path="/meal-plan-creation" element={<MealPlanCreationForm />} /> 
                    <Route path="/meal-plans" element={<ViewMealPlan />} />

                </Routes>
            </Grid>

            {/* Right section for friend suggestions */}
            <Grid item xs={12} lg={2.5} className="hidden lg:block relative">
                <FriendSuggestions />
            </Grid>
        </Grid>
    );
};

export default HomePage;
