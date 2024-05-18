package dev.paf.Thrivezone.model;


import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "workoutplans")
public class WorkoutModel {

    @Id
    private String id;
    private String title;
    private List<Exercise> exercises;
    private String focused;

    //default constructor
    public WorkoutModel() {
    }

    //constructor without id

    public WorkoutModel(String title, List<Exercise> exercises,String focused) {
        this.title = title;
        this.exercises = exercises;
        this.focused = focused;
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

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    public String getFocused() {
        return focused;
    }

    public void setFocused(String focused) {
        this.focused = focused;
    }
}



