import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MealPlanCreationForm = () => {
  const navigate = useNavigate();
  const [newMealPlan, setNewMealPlan] = useState({
    title: '',
    recipes: [],
    dietaryPreference: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMealPlan({ ...newMealPlan, [name]: value });
  };

  const handleRecipeInputChange = (index, e) => {
    const { name, value } = e.target;
    const recipesCopy = [...newMealPlan.recipes];
    recipesCopy[index][name] = value;
    setNewMealPlan({ ...newMealPlan, recipes: recipesCopy });
  };

  const handlePhotoUpload = (index, e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const recipesCopy = [...newMealPlan.recipes];
      recipesCopy[index].photo = reader.result;
      setNewMealPlan({ ...newMealPlan, recipes: recipesCopy });
    };
  };

  const addRecipe = () => {
    setNewMealPlan({
      ...newMealPlan,
      recipes: [...newMealPlan.recipes, { name: '', ingredients: '', instructions: '', photo: '' }],
    });
  };

  const submitMealPlan = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/meal-plans', newMealPlan);
      if (response && response.data) {
        console.log('Meal plan created:', response.data);
        setNewMealPlan({ title: '', recipes: [], dietaryPreference: '' });
        navigate('/view-meal-plans'); // Redirect to the view meal plans page after successful submission
      } else {
        console.error('Error creating meal plan: Response or response.data is undefined');
      }
    } catch (error) {
      console.error('Error creating meal plan:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-gray-100 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create a Meal Plan</h1>
        <form>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newMealPlan.title}
              onChange={handleInputChange}
              className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Enter a title for your meal plan"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="dietaryPreference" className="block text-sm font-semibold text-gray-700 mb-2">Dietary Preferences</label>
            <select
              id="dietaryPreference"
              name="dietaryPreference"
              value={newMealPlan.dietaryPreference}
              onChange={handleInputChange}
              className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            >
              <option value="">Select Dietary Preference</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto</option>
            </select>
          </div>
          {newMealPlan.recipes.map((recipe, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
              <input
                type="text"
                name="name"
                value={recipe.name}
                onChange={(e) => handleRecipeInputChange(index, e)}
                className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Recipe Name"
              />
              <input
                type="text"
                name="ingredients"
                value={recipe.ingredients}
                onChange={(e) => handleRecipeInputChange(index, e)}
                className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Ingredients"
              />
              <input
                type="text"
                name="instructions"
                value={recipe.instructions}
                onChange={(e) => handleRecipeInputChange(index, e)}
                className="w-full py-2 px-4 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Cooking Instructions"
              />
              <input
                type="file"
                name="photo"
                onChange={(e) => handlePhotoUpload(index, e)} 
                className="py-2 px-4 mb-2 border border-gray-300 rounded-lg"
              />
              {recipe.photo && <img src={recipe.photo} alt={recipe.name} className="w-full mt-2 rounded-lg" />}
            </div>
          ))}
          <button type="button" onClick={addRecipe} className="block w-full py-2 px-4 mb-4 bg-green-600 text-white rounded-lg hover:bg-green-700 0 focus:outline-none focus:bg-green-600">
            Add Recipe
          </button>
          <button onClick={submitMealPlan} className="block w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Submit Meal Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealPlanCreationForm;
