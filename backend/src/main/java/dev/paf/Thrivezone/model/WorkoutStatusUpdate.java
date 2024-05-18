// WorkoutStatusUpdate.java
package dev.paf.Thrivezone.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "workoutStatusUpdates")
public class WorkoutStatusUpdate {

    @Id
    private String id;
    private double distance;
    private int pushups;
    private String weight;
    private String description;

    // Constructors
    public WorkoutStatusUpdate() {
    }

    public WorkoutStatusUpdate(double distance, int pushups, String weight, String description) {
        this.distance = distance;
        this.pushups = pushups;
        this.weight = weight;
        this.description = description;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public int getPushups() {
        return pushups;
    }

    public void setPushups(int pushups) {
        this.pushups = pushups;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
