import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileIcon from '../User/user.jpg';
import fitImage from './fit.jpg';
import bg_c from './bg_c.jpg'; // Import the background image

function ViewWorkoutStatusPage() {
    const [workoutStatusList, setWorkoutStatusList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedWorkout, setEditedWorkout] = useState({
        id: '',
        distance: '',
        pushups: '',
        weight: '',
        description: ''
    });

    useEffect(() => {
        async function fetchWorkoutStatus() {
            try {
                const response = await axios.get('http://localhost:8080/api/workoutStatusUpdates');
                setWorkoutStatusList(response.data);
            } catch (error) {
                console.error('Error fetching workout status:', error);
            }
        }
        fetchWorkoutStatus();
    }, []);

    const handleEditWorkoutStatus = (workout) => {
        setEditedWorkout(workout);
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedWorkout(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateWorkoutStatus = async () => {
        try {
            await axios.put(`http://localhost:8080/api/workoutStatusUpdates/${editedWorkout.id}`, editedWorkout);
            setEditMode(false);
            setEditedWorkout({
                id: '',
                distance: '',
                pushups: '',
                weight: '',
                description: ''
            });
            const response = await axios.get('http://localhost:8080/api/workoutStatusUpdates');
            setWorkoutStatusList(response.data);
        } catch (error) {
            console.error('Error updating workout status:', error);
        }
    };

    const handleDeleteWorkoutStatus = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/workoutStatusUpdates/${id}`);
            const response = await axios.get('http://localhost:8080/api/workoutStatusUpdates');
            setWorkoutStatusList(response.data);
        } catch (error) {
            console.error('Error deleting workout status:', error);
        }
    };

    const navigateToHomePage = () => {
        // Implement navigation logic here if needed
    };

    return (
        <div className="flex justify-center bg-gray-100 min-h-screen">
            <div className="w-full p-4">
                <div className="flex items-center mb-8" onClick={navigateToHomePage} style={{ cursor: 'pointer' }}>
                    <div className="flex-shrink-0 mr-4">
                        <img className="w-12 h-12 rounded-full" src={profileIcon} alt="Profile" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Anna Smith</h2>
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-8">Workout Status</h1>
                {workoutStatusList.map((workout, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-8 flex relative" style={{ backgroundImage: `url(${bg_c})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <img className="w-24 h-24 rounded-full mr-6" src={fitImage} alt="Fit" />
                        <div>
                            <p className="text-lg font-semibold mb-2">Workout {index + 1}</p>
                            {editMode && editedWorkout.id === workout.id ? (
                                <form className="mb-4" onSubmit={handleUpdateWorkoutStatus}>
                                    <div className="mb-4">
                                        <label className="font-bold" htmlFor="distance">Distance Ran:</label>
                                        <input
                                            className="w-full p-3 border border-gray-300 rounded"
                                            type="text"
                                            id="distance"
                                            name="distance"
                                            value={editedWorkout.distance}
                                            onChange={handleInputChange}
                                            placeholder="Enter distance ran"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-bold" htmlFor="pushups">Number of Pushups:</label>
                                        <input
                                            className="w-full p-3 border border-gray-300 rounded"
                                            type="number"
                                            id="pushups"
                                            name="pushups"
                                            value={editedWorkout.pushups}
                                            onChange={handleInputChange}
                                            placeholder="Enter number of pushups"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-bold" htmlFor="weight">Weight Lifted:</label>
                                        <select
                                            className="w-full p-3 border border-gray-300 rounded"
                                            id="weight"
                                            name="weight"
                                            value={editedWorkout.weight}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select weight lifted</option>
                                            <option value="light">Light</option>
                                            <option value="medium">Medium</option>
                                            <option value="heavy">Heavy</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="font-bold" htmlFor="description">Brief Description:</label>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded h-32"
                                            id="description"
                                            name="description"
                                            value={editedWorkout.description}
                                            onChange={handleInputChange}
                                            placeholder="Enter a brief description"
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end absolute bottom-4 right-4">
                                        <button className="px-4 py-2 text-white rounded cursor-pointer bg-green-600 and hover:bg-green-700">Update</button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <p><span className="font-semibold">Distance Ran:</span> {workout.distance}</p>
                                    <p><span className="font-semibold">Number of Pushups:</span> {workout.pushups}</p>
                                    <p><span className="font-semibold">Weight Lifted:</span> {workout.weight}</p>
                                    <p><span className="font-semibold">Brief Description:</span> {workout.description}</p>
                                    <div className="mt-6 flex justify-center space-x-4">
                                        <button onClick={() => handleEditWorkoutStatus(workout)} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer">Edit</button>
                                        <button onClick={() => handleDeleteWorkoutStatus(workout.id)} className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded cursor-pointer">Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewWorkoutStatusPage;
