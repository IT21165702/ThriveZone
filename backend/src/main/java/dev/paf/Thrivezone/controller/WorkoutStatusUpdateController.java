// WorkoutStatusUpdateController.java
package dev.paf.Thrivezone.controller;

import dev.paf.Thrivezone.model.WorkoutStatusUpdate;
import dev.paf.Thrivezone.service.WorkoutStatusUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workoutStatusUpdates")
public class WorkoutStatusUpdateController {

    @Autowired
    private WorkoutStatusUpdateService workoutStatusUpdateService;

    @GetMapping
    public List<WorkoutStatusUpdate> getAllWorkoutStatusUpdates() {
        return workoutStatusUpdateService.getAllWorkoutStatusUpdates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutStatusUpdate> getWorkoutStatusUpdateById(@PathVariable String id) {
        WorkoutStatusUpdate workoutStatusUpdate = workoutStatusUpdateService.getWorkoutStatusUpdateById(id);
        if (workoutStatusUpdate != null) {
            return ResponseEntity.ok(workoutStatusUpdate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<WorkoutStatusUpdate> createWorkoutStatusUpdate(@RequestBody WorkoutStatusUpdate workoutStatusUpdate) {
        WorkoutStatusUpdate createdWorkoutStatusUpdate = workoutStatusUpdateService.createWorkoutStatusUpdate(workoutStatusUpdate);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkoutStatusUpdate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutStatusUpdate> updateWorkoutStatusUpdate(@PathVariable String id, @RequestBody WorkoutStatusUpdate workoutStatusUpdate) {
        WorkoutStatusUpdate updatedWorkoutStatusUpdate = workoutStatusUpdateService.updateWorkoutStatusUpdate(id, workoutStatusUpdate);
        if (updatedWorkoutStatusUpdate != null) {
            return ResponseEntity.ok(updatedWorkoutStatusUpdate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkoutStatusUpdate(@PathVariable String id) {
        workoutStatusUpdateService.deleteWorkoutStatusUpdate(id);
        return ResponseEntity.noContent().build();
    }
}
