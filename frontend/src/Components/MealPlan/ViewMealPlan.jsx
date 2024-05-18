import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import MealPlanCreationForm from './MealPlanCreationForm';

function ViewMealPlan() {
  const [mealPlans, setMealPlans] = useState(null);
  const [editingMealPlan, setEditingMealPlan] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [minimizeOpacity, setMinimizeOpacity] = useState(false);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/meal-plans');
        setMealPlans(response.data);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
        setMealPlans([]);
      }
    };

    fetchMealPlans();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/meal-plans/${id}`);
      setMealPlans(mealPlans.filter(mealPlan => mealPlan.id !== id));
    } catch (error) {
      console.error('Error deleting meal plan:', error);
    }
  };

  const handleUpdate = (mealPlan) => {
    setEditingMealPlan({ ...mealPlan });
  };

  const handleSubmitUpdate = async () => {
    try {
      let imageUrl = editingMealPlan.image;
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

      const updatedMealPlan = { ...editingMealPlan, image: imageUrl };
      await axios.put(`http://localhost:8081/api/meal-plans/${editingMealPlan.id}`, updatedMealPlan);

      const updatedMealPlans = mealPlans.map(mealPlan => {
        if (mealPlan.id === editingMealPlan.id) {
          return { ...updatedMealPlan };
        }
        return mealPlan;
      });
      setMealPlans(updatedMealPlans);
      setEditingMealPlan(null);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error updating meal plan:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingMealPlan(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeRecipe = (index, field, value) => {
    const updatedRecipes = [...editingMealPlan.recipes];
    updatedRecipes[index][field] = value;
    setEditingMealPlan(prevState => ({
      ...prevState,
      recipes: updatedRecipes
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex justify-between items-center">
        <span>Meal Plans</span>
        <button onClick={() => {
          setShowDialog(true);
          setMinimizeOpacity(true);
        }} className="bg-green-600 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add New Meal Plan
        </button>
      </h2>

      {/* Display the MealPlanCreationForm in a dialog box */}
      {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full bg-gray-900 bg-opacity-75"></div>
          <div className="z-10 bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-full max-w-screen-lg">
            <MealPlanCreationForm />
            <button onClick={() => {
              setShowDialog(false);
              setMinimizeOpacity(false);
            }} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Close
            </button>
          </div>
        </div>
      )}

      {/* FriendSuggestions */}
      <div className={`mt-8 ${minimizeOpacity ? 'opacity-50' : ''}`}>
        {/* Your FriendSuggestions component goes here */}
      </div>

      {/* Rest of your component */}
      {mealPlans !== null && mealPlans !== undefined ? (
        <div>
          {mealPlans.length > 0 ? (
            mealPlans.map(mealPlan => (
              <div key={mealPlan.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                {mealPlan.image && <img src={mealPlan.image} alt={mealPlan.title} className="rounded-lg mb-4" />}
                <h3 className="text-xl font-semibold text-gray-800"><b>Title:</b> {mealPlan.title}</h3>
                <p className="text-gray-600 mb-2">Dietary Preference: {mealPlan.dietaryPreference}</p>
                {mealPlan.recipes && mealPlan.recipes.length > 0 ? (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2"><b>Recipes:</b></h4>
                    {mealPlan.recipes.map((recipe, index) => (
                      <div key={index} className="mb-2">
                        <h5 className="text-lg font-semibold text-gray-800">Recipe Name: {recipe.name}</h5>
                        <p className="text-gray-600">Ingredients: {recipe.ingredients}</p>
                        <p className="text-gray-600">Instructions: {recipe.instructions}</p>
                        {recipe.photo && <img src={recipe.photo} alt={recipe.name} className="mb-2" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No recipes available</p>
                )}
                <div className="flex justify-between mt-4">
                  <button onClick={() => handleUpdate(mealPlan)} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Update
                  </button>
                  <button onClick={() => handleDelete(mealPlan.id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No meal plans available</p>
          )}
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}

      {editingMealPlan && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Meal Plan</h2>
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
                  value={editingMealPlan.title || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dietaryPreference">Dietary Preference</label>
                <input
                  type="text"
                  id="dietaryPreference"
                  name="dietaryPreference"
                  value={editingMealPlan.dietaryPreference || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter dietary preference"
                />
              </div>
              {editingMealPlan.recipes && editingMealPlan.recipes.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2"><b>Edit Recipes:</b></h4>
                  {editingMealPlan.recipes.map((recipe, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        name={`recipeName${index}`}
                        value={recipe.name}
                        onChange={(e) => handleChangeRecipe(index, 'name', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter recipe name"
                      />
                      <textarea
                        name={`ingredients${index}`}
                        value={recipe.ingredients}
                        onChange={(e) => handleChangeRecipe(index, 'ingredients', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter ingredients"
                      />
                      <textarea
                        name={`instructions${index}`}
                        value={recipe.instructions}
                        onChange={(e) => handleChangeRecipe(index, 'instructions', e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter instructions"
                      />
                      <input
                        type="file"
                        name={`photo${index}`}
                        onChange={(e) => handleChangeRecipe(index, 'photo', e.target.files[0])} 
                        className="py-2 px-4 mb-2 border border-gray-300 rounded-lg"
                      />
                      {recipe.photo && <img src={recipe.photo} alt={recipe.name} className="mb-2" />}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end">
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                  Save
                </button>
                <button onClick={() => setEditingMealPlan(null)} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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

export default ViewMealPlan;
    
    