package dev.paf.Thrivezone.service;

import dev.paf.Thrivezone.model.WorkoutStatusUpdate;
import dev.paf.Thrivezone.repository.WorkoutStatusUpdateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutStatusUpdateService {

    @Autowired
    private WorkoutStatusUpdateRepository workoutStatusUpdateRepository;

    public List<WorkoutStatusUpdate> getAllWorkoutStatusUpdates() {
        return workoutStatusUpdateRepository.findAll();
    }

    public WorkoutStatusUpdate getWorkoutStatusUpdateById(String id) {
        Optional<WorkoutStatusUpdate> optional = workoutStatusUpdateRepository.findById(id);
        return optional.orElse(null);
    }

    public WorkoutStatusUpdate createWorkoutStatusUpdate(WorkoutStatusUpdate workoutStatusUpdate) {
        return workoutStatusUpdateRepository.save(workoutStatusUpdate);
    }

    public WorkoutStatusUpdate updateWorkoutStatusUpdate(String id, WorkoutStatusUpdate updatedWorkoutStatusUpdate) {
        Optional<WorkoutStatusUpdate> optional = workoutStatusUpdateRepository.findById(id);
        if (optional.isPresent()) {
            updatedWorkoutStatusUpdate.setId(id);
            return workoutStatusUpdateRepository.save(updatedWorkoutStatusUpdate);
        } else {
            // Workout status update with given id not found
            return null;
        }
    }

    public void deleteWorkoutStatusUpdate(String id) {
        workoutStatusUpdateRepository.deleteById(id);
    }
}
