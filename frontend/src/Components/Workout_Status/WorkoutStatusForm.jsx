import React, { useState } from 'react';
import axios from 'axios';
import profileIcon from '../User/user.jpg';
import { Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel, TextareaAutosize } from '@mui/material';

function WorkoutStatusForm() {
    const [distance, setDistance] = useState('');
    const [pushups, setPushups] = useState('');
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/workoutStatusUpdates', {
                distance,
                pushups: parseInt(pushups),
                weight,
                description
            });
            console.log('Workout status submitted:', response.data);
            setSuccessMessage('Workout status submitted successfully.');
        } catch (error) {
            console.error('Error submitting workout status:', error);
            setErrorMessage('Error submitting workout status. Please try again.');
        }
    };

    const handleOKClick = () => {
        setSuccessMessage('');
        setErrorMessage('');
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                            <a href="/"><img className="w-12 h-12 rounded-full" src={profileIcon} alt="Profile" /></a>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Insert Your Workout Status</h2>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Distance Ran"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                placeholder="Enter distance ran"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Number of Pushups"
                                type="number"
                                value={pushups}
                                onChange={(e) => setPushups(e.target.value)}
                                placeholder="Enter number of pushups"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Weight Lifted</InputLabel>
                                <Select
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                >
                                    <MenuItem value="">Select weight lifted</MenuItem>
                                    <MenuItem value="light">Light</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="heavy">Heavy</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextareaAutosize
                                rowsMin={4}
                                placeholder="Enter a brief description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#388E3C' } }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {successMessage && (
                    <div className="mt-4 bg-green-100 border border-green-400 text-green-700 rounded p-3">
                        <p>{successMessage}</p>
                        <Button variant="contained" color="primary" onClick={handleOKClick} fullWidth>OK</Button>
                    </div>
                )}
                {errorMessage && (
                    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 rounded p-3">
                        <p>{errorMessage}</p>
                        <Button variant="contained" color="primary" onClick={handleOKClick} fullWidth>OK</Button>
                    </div>
                )}
            </Grid>
        </Grid>
    );
}

export default WorkoutStatusForm;
