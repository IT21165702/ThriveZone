import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function CreatePost() {
    const [postData, setPostData] = useState({
        username: '',
        content: '',
        images: null
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'images') {
            const updatedImages = [...postData.images];
            updatedImages[index] = value;
            setPostData({ ...postData, images: updatedImages });
        } else {
            setPostData({ ...postData, [name]: value });
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPostData({ ...postData, images: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClear = () => {
        setPostData({
            username: '',
            content: '',
            images: null
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('New post created:', data);
                alert('New post created successfully!');

                // Reset form fields to initial values
                setPostData({
                    username: '',
                    content: '',
                    images: null
                });
            } else {
                throw new Error('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Error creating post!');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ maxWidth: '600px', width: '100%', padding: '20px', backgroundColor: '#FFF', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <Typography variant="h4" component="h1" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    Create a New Post
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        value={postData.username}
                        onChange={(e) => handleChange(e)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Content"
                        name="content"
                        value={postData.content}
                        onChange={(e) => handleChange(e)}
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                            required
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload Image
                            </Button><br></br><br></br>
                        </label>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <Button variant="outlined" color="error" onClick={handleClear} sx={{ marginRight: '10px' }}>
                            Clear
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Create Post
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default CreatePost;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Grid, TextField, Button, TextareaAutosize } from '@mui/material';

// function CreatePost() {
//     const [username, setUsername] = useState('');
//     const [content, setContent] = useState('');
//     const [media, setMedia] = useState([]);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/api/posts', {
//                 username,
//                 content,
//                 media
//             });
//             console.log('Post submitted:', response.data);
//             setSuccessMessage('Post created successfully.');
//             // Reset form fields after successful submission
//             setUsername('');
//             setContent('');
//             setMedia([]);
//         } catch (error) {
//             console.error('Error submitting post:', error);
//             setErrorMessage('Error submitting post. Please try again.');
//         }
//     };

//     const handleOKClick = () => {
//         setSuccessMessage('');
//         setErrorMessage('');
//     };

//     return (
//         <Grid container spacing={2}>
//             <Grid item xs={12}>
//                 <h2 className="text-xl font-bold">Create New Post</h2>
//             </Grid>
//             <Grid item xs={12}>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 label="Username"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextareaAutosize
//                                 rowsMin={4}
//                                 placeholder="Enter post content"
//                                 value={content}
//                                 onChange={(e) => setContent(e.target.value)}
//                                 style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//                                 required
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <input
//                                 type="file"
//                                 accept="image/*, video/*"
//                                 multiple
//                                 onChange={(e) => setMedia(e.target.files)}
//                                 className="mt-1 w-full text-gray-700"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 type="submit"
//                                 fullWidth
//                             >
//                                 Post
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </form>
//                 {successMessage && (
//                     <div className="mt-4 bg-green-100 border border-green-400 text-green-700 rounded p-3">
//                         <p>{successMessage}</p>
//                         <Button variant="contained" color="primary" onClick={handleOKClick} fullWidth>OK</Button>
//                     </div>
//                 )}
//                 {errorMessage && (
//                     <div className="mt-4 bg-red-100 border border-red-400 text-red-700 rounded p-3">
//                         <p>{errorMessage}</p>
//                         <Button variant="contained" color="primary" onClick={handleOKClick} fullWidth>OK</Button>
//                     </div>
//                 )}
//             </Grid>
//         </Grid>
//     );
// }

// export default CreatePost;