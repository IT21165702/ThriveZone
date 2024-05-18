package dev.paf.Thrivezone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dev.paf.Thrivezone.model.MealPrepModel;
import dev.paf.Thrivezone.repository.MealPrepRepository;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/meal-plans")
public class MealPrepController {
    @Autowired
    private MealPrepRepository mealPrepRepository;

    @PostMapping
    public ResponseEntity<MealPrepModel> createMealPlan(@RequestBody MealPrepModel mealPlan) {
        try {
            MealPrepModel savedMealPlan = mealPrepRepository.save(mealPlan);
            return new ResponseEntity<>(savedMealPlan, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<MealPrepModel>> getAllMealPlans() {
        List<MealPrepModel> mealPlans = mealPrepRepository.findAll();
        return new ResponseEntity<>(mealPlans, HttpStatus.OK);
    }

    // Other endpoints: get by id, update, delete

    @GetMapping("/{id}")
    public ResponseEntity<MealPrepModel> getMealPlanById(@PathVariable String id) {
        Optional<MealPrepModel> optionalMealPlan = mealPrepRepository.findById(id);
        return optionalMealPlan.map(mealPlan -> new ResponseEntity<>(mealPlan, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MealPrepModel> updateMealPlan(@PathVariable String id, @RequestBody MealPrepModel updatedMealPlan) {
        Optional<MealPrepModel> optionalMealPlan = mealPrepRepository.findById(id);
        if (optionalMealPlan.isPresent()) {
            updatedMealPlan.setId(id);
            MealPrepModel savedMealPlan = mealPrepRepository.save(updatedMealPlan);
            return new ResponseEntity<>(savedMealPlan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMealPlan(@PathVariable String id) {
        Optional<MealPrepModel> optionalMealPlan = mealPrepRepository.findById(id);
        if (optionalMealPlan.isPresent()) {
            mealPrepRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
