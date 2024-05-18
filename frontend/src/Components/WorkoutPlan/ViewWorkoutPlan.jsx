import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkoutPlanCreation from './CreateWorkout';

function ViewWorkoutPlan() {
  const [workoutPlans, setWorkoutPlans] = useState(null);
  const [editingWorkoutPlan, setEditingWorkoutPlan] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [minimizeOpacity, setMinimizeOpacity] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/workout-plans');
        setWorkoutPlans(response.data);
      } catch (error) {
        console.error('Error fetching Workout Plans:', error);
        setWorkoutPlans([]);
      }
    };

    fetchWorkoutPlans();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/workout-plans/${id}`);
      setWorkoutPlans(workoutPlans.filter(workoutPlan => workoutPlan.id !== id));
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting workout plan:', error);
    }
  };

  const handleUpdate = (workoutPlan) => {
    setEditingWorkoutPlan({ ...workoutPlan });
  };

  const handleSubmitUpdate = async () => {
    try {
      let imageUrl = editingWorkoutPlan.image;
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        const response = await axios.post('http://localhost:8081/api/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imageUrl = response.data.imageUrl;
      }

      const updatedWorkoutPlan = { ...editingWorkoutPlan, image: imageUrl };
      await axios.put(`http://localhost:8081/api/workout-plans/${editingWorkoutPlan.id}`, updatedWorkoutPlan);

      const updatedWorkoutPlans = workoutPlans.map(workoutPlan => {
        if (workoutPlan.id === editingWorkoutPlan.id) {
          return { ...updatedWorkoutPlan };
        }
        return workoutPlan;
      });
      setWorkoutPlans(updatedWorkoutPlans);
      setEditingWorkoutPlan(null);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error updating workout plan:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingWorkoutPlan(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeExercise = (index, field, value) => {
    const updatedExercises = [...editingWorkoutPlan.exercises];
    updatedExercises[index][field] = value;
    setEditingWorkoutPlan(prevState => ({
      ...prevState,
      exercises: updatedExercises
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex justify-between items-center">
        <span>Workout Plans</span>
        <button onClick={() => {
          setShowDialog(true);
          setMinimizeOpacity(true);
        }} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add New Workout Plan
        </button>
      </h2>

      {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full bg-gray-900 bg-opacity-75"></div>
          <div className="z-10 bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-full max-w-screen-lg">
            <WorkoutPlanCreation/>
            <button onClick={() => {
              setShowDialog(false);
              setMinimizeOpacity(false);
            }} className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
              Close
            </button>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full bg-gray-900 bg-opacity-75"></div>
          <div className="z-10 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this workout plan?</p>
            <div className="flex justify-end">
              <button onClick={() => handleDelete(deleteId)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                Delete
              </button>
              <button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`mt-8 ${minimizeOpacity ? 'opacity-50' : ''}`}>
        {/* Your FriendSuggestions component goes here */}
      </div>

      {workoutPlans !== null && workoutPlans !== undefined ? (
        <div>
          {workoutPlans.length > 0 ? (
            workoutPlans.map(workoutPlan => (
              <div key={workoutPlan.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                {workoutPlan.image && <img src={workoutPlan.image} alt={workoutPlan.title} className="rounded-lg mb-4" />}
                <h3 className="text-xl font-semibold text-gray-800"><b>Title:</b> {workoutPlan.title}</h3>
                <p className="text-gray-600 mb-2">{workoutPlan.focused}</p>
                {workoutPlan.exercises && workoutPlan.exercises.length > 0 ? (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2"><b>Exercises:</b></h4>
                    {workoutPlan.exercises.map((exercise, index) => (
                      <div key={index} className="mb-2">
                        <h5 className="text-lg font-semibold text-gray-800">{exercise.name}</h5>
                        <p className="text-gray-600">Sets: {exercise.sets}</p>
                        <p className="text-gray-600">Reps: {exercise.reps}</p>
                        {exercise.photo && <img src={exercise.photo} alt={exercise.name} className="mb-2" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No exercises available</p>
                )}
                <div className="flex justify-between mt-4">
                  <button onClick={() => handleUpdate(workoutPlan)} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Update
                  </button>
                  <button onClick={() => {
                    setShowDeleteConfirm(true);
                    setDeleteId(workoutPlan.id);
                  }} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No Workout Plans available</p>
          )}
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}

      {editingWorkoutPlan && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Workout Plan</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmitUpdate();
            }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editingWorkoutPlan.title || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dietaryPreference">Focused Area</label>
                <input
                  type="text"
                  id="focused"
                  name="focused"
                  value={editingWorkoutPlan.focused || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Focused Area"
                />
              </div>
              {editingWorkoutPlan.exercises && editingWorkoutPlan.exercises.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2"><b>Edit Exercises:</b></h4>
                  {editingWorkoutPlan.exercises.map((exercise, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        name={`exerciseName${index}`}
                        value={exercise.name}
                        onChange={(e) => handleChangeExercise(index, 'name', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter exercise name"
                      />
                      <textarea
                        name={`sets${index}`}
                        value={exercise.sets}
                        onChange={(e) => handleChangeExercise(index, 'sets', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter sets"
                      />
                      <textarea
                        name={`reps${index}`}
                        value={exercise.reps}
                        onChange={(e) => handleChangeExercise(index, 'reps', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter reps"
                      />
                      <input
                        type="file"
                        name={`photo${index}`}
                        onChange={(e) => handleChangeExercise(index, 'photo', e.target.files[0])} 
                        className="py-2 px-4 mb-2 border border-gray-300 rounded-lg"
                      />
                      {exercise.photo && <img src={exercise.photo} alt={exercise.name} className="mb-2" />}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end">
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                  Save
                </button>
                <button onClick={() => setEditingWorkoutPlan(null)} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewWorkoutPlan;
