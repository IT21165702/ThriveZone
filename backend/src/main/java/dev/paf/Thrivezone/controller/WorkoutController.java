package dev.paf.Thrivezone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dev.paf.Thrivezone.model.WorkoutModel;
import dev.paf.Thrivezone.repository.WorkoutPlansRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/workout-plans")
public class WorkoutController {
    @Autowired
    private WorkoutPlansRepository workoutPlansRepository;

    @PostMapping
    public ResponseEntity<WorkoutModel> createWorkoutPlan(@RequestBody WorkoutModel workoutPlan) {
        try {
            WorkoutModel savedWorkoutPlan = workoutPlansRepository.save(workoutPlan);
            return new ResponseEntity<>(savedWorkoutPlan, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<WorkoutModel>> getAllWorkoutPlans() {
        List<WorkoutModel> workoutPlan = workoutPlansRepository.findAll();
        return new ResponseEntity<>(workoutPlan, HttpStatus.OK);
    }

    // Other endpoints: get by id, update, delete

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutModel> getMealPlanById(@PathVariable String id) {
        Optional<WorkoutModel> optionalWorkoutPlan = workoutPlansRepository.findById(id);
        return optionalWorkoutPlan.map(workoutPlan -> new ResponseEntity<>(workoutPlan, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutModel> updateWorkoutPlan(@PathVariable String id, @RequestBody WorkoutModel updatedWorkoutPlan) {
        Optional<WorkoutModel> optionalWorkoutPlan = workoutPlansRepository.findById(id);
        if (optionalWorkoutPlan.isPresent()) {
            updatedWorkoutPlan.setId(id);
            WorkoutModel savedWorkoutPlan = workoutPlansRepository.save(updatedWorkoutPlan);
            return new ResponseEntity<>(savedWorkoutPlan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkoutPlan(@PathVariable String id) {
        Optional<WorkoutModel> optionalWorkoutPlan = workoutPlansRepository.findById(id);
        if (optionalWorkoutPlan.isPresent()) {
            workoutPlansRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
