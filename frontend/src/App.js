import { Route, Routes } from 'react-router-dom'
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import Authentication from './Components/Authentication/Authentication';
import CreatePost from './Components/Posts/CreatePost';
import PostList from './Components/Posts/PostList';
import PostDetails from './Components/Posts/PostDetails';
import EditDeletePostPage from './Components/Posts/EditDeletePostPage';
import WorkoutStatusForm from './Components/Workout_Status/WorkoutStatusForm';
import ViewWorkoutStatusPage from './Components/Workout_Status/ViewWorkoutStatusPage';
import UserProfilePage from './Components/User/UserProfilePage';
import ViewMealPlan from './Components/MealPlan/ViewMealPlan.jsx';
import MealPlanCreationForm from './Components/MealPlan/MealPlanCreationForm.jsx';
import ViewWorkoutPlan from './Components/WorkoutPlan/ViewWorkoutPlan.jsx';


function App() {
  return (
    <div className="">

      <Routes>
        <Route path="/*" element={true?<HomePage/>:<Authentication/>}/>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post-list" element={<PostList />} />
        <Route path="/posts/:postId" component={<PostDetails />} />
        <Route path="/edit-delete-posts" element={<EditDeletePostPage />} />
        <Route path="/userprofile" element={<UserProfilePage />} /> 
        <Route path="/update-workout-status" element={<WorkoutStatusForm />} /> 
        <Route path="/view-workout-status" element={<ViewWorkoutStatusPage />} /> 
        <Route path="/view-workout-plans" element={<ViewWorkoutPlan/>}/>
        <Route path="/view-meal-plans" element={<ViewMealPlan />} /> 
        <Route path="/meal-plan-creation" element={<MealPlanCreationForm />} />

      </Routes>
      
    </div>
  );
}

export default App;
