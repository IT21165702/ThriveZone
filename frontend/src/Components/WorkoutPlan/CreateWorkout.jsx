import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WorkoutPlanForm = () => {
  const navigate = useNavigate();
  const [newWorkout, setNewWorkoutPlan] = useState({
    title: '',
    exercises: [],
    focused: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkoutPlan({ ...newWorkout, [name]: value });
  };

  const handleExercises = (index, e) => {
    const { name, value } = e.target;
    const exercisesCopy = [...newWorkout.exercises];
    exercisesCopy[index][name] = value;
    setNewWorkoutPlan({ ...newWorkout, exercises: exercisesCopy });
  };

  const handlePhotoUpload = (index, e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageCopy = [...newWorkout.exercises];
      imageCopy[index].photo = reader.result;
      setNewWorkoutPlan({ ...newWorkout, exercises: imageCopy });
    };
  };

  const addExercises = () => {
    setNewWorkoutPlan({
      ...newWorkout,
      exercises: [...newWorkout.exercises, { name: '', sets: '', reps: '', photo: '' }],
    });
  };

  const handleRemoveExercise = (index) => {
    const exercisesCopy = [...newWorkout.exercises];
    exercisesCopy.splice(index, 1);
    setNewWorkoutPlan({ ...newWorkout, exercises: exercisesCopy });
  };

  const validateForm = () => {
    if (!newWorkout.title.trim()) {
      setError('Please enter a title for your workout plan.');
      return false;
    }
    if (!newWorkout.focused.trim()) {
      setError('Please select a focused area for your workout plan.');
      return false;
    }
    if (newWorkout.exercises.length === 0) {
      setError('Please add at least one exercise to your workout plan.');
      return false;
    }
    for (const exercise of newWorkout.exercises) {
      if (!exercise.name.trim() || !exercise.sets.trim() || !exercise.reps.trim() ) {
        setError('Please fill in all details for each exercise.');
        return false;
      }
    }
    return true;
  };

  const submitWorkoutPlan = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/workout-plans', newWorkout);
      if (response && response.data) {
        console.log('Workout Plan created:', response.data);
        setNewWorkoutPlan({ title: '', exercises: [], focused: '' });
        window.location.reload(); // Refresh the page
        navigate('/workout-plans'); // Redirect to the workouts page
      } else {
        console.error('Error creating workout plans: Response or response.data is undefined');
      }
    } catch (error) {
      console.error('Error creating workout plans:', error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create a Workout Plan</h1>
        <form onSubmit={submitWorkoutPlan} className="flex-grow flex flex-col">
          <div className="flex-grow overflow-y-auto">
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newWorkout.title}
                onChange={handleInputChange}
                className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Enter a title for your Workout Plan"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="focused" className="block text-sm font-semibold text-gray-700 mb-2">Focused Area</label>
              <select
                id="focused"
                name="focused"
                value={newWorkout.focused}
                onChange={handleInputChange}
                className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="">Select Focused Area</option>
                <option value="Chest & Triceps">Chest & Triceps</option>
                <option value="Back & Biceps">Back & Biceps</option>
                <option value="Shoulders & Legs">Shoulders & Legs</option>
              </select>
            </div>
            {newWorkout.exercises.map((exercise, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={exercise.name}
                  onChange={(e) => handleExercises(index, e)}
                  className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Exercise name"
                />
                <input
                  type="text"
                  name="sets"
                  value={exercise.sets}
                  onChange={(e) => handleExercises(index, e)}
                  className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Sets"
                />
                <input
                  type="text"
                  name="reps"
                  value={exercise.reps}
                  onChange={(e) => handleExercises(index, e)}
                  className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Reps"
                />
                <input
                  type="file"
                  name="photo"
                  onChange={(e) => handlePhotoUpload(index, e)}
                  className="py-2 px-4 mb-2 border border-gray-300 rounded-lg"
                />
                {exercise.photo && <img src={exercise.photo} alt={exercise.name} className="w-full mt-2 rounded-lg" />}
                <button
                  type="button"
                  onClick={() => handleRemoveExercise(index)}
                  className="mt-2 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Remove Exercise
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addExercises}
              className="block w-full py-2 px-4 mb-4 bg-white text-black border border-green-600 rounded-lg hover:bg-gray-200 hover:text-black focus:outline-none focus:bg-gray-200 focus:text-black"
              >
                Add Exercises
              </button>
              {error && <p className="text-red-500 mb-4">{error}</p>}
            </div>
            <div>
              <button type="submit" className="block w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-600">
                Submit Workout Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default WorkoutPlanForm;
  
