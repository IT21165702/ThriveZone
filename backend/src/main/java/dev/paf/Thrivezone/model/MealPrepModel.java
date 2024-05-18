package dev.paf.Thrivezone.model;


import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mealplans")
public class MealPrepModel {

    @Id
    private String id;
    private String title;
    private List<Recipe> recipes;
    private String dietaryPreference;

    //default constructor
    public MealPrepModel() {
    }

    //constructor without id

    public MealPrepModel(String title, List<Recipe> recipes,String dietaryPreference) {
        this.title = title;
        this.recipes = recipes;
        this.dietaryPreference = dietaryPreference;
    }


    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    public String getDietaryPreference() {
        return dietaryPreference;
    }

    public void setDietaryPreference(String dietaryPreference) {
        this.dietaryPreference = dietaryPreference;
    }
}



