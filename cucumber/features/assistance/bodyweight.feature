@531
@premium
Feature: Custom - Assistance Work

  Scenario: Viewing bodyweight lifts and viewing the log
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    And I select "Bodyweight" assistance work
    Then Assistance movement 1 is "One leg squat 5 sets 15x [?]lbs"
    Then Assistance movement 2 is "Sit-ups 5 sets 15x [?]lbs"
    And I tap the "Save" button
    Then I am on the track tab
    And I tap "Asst." to change the log type
    Then Assistance log entry 1 shows "Bodyweight Sit-ups Sets: 5 15x [?]"
    Then Assistance log entry 2 shows "Bodyweight One leg squat Sets: 5 15x [?]"

  Scenario: Changing bodyweight lift movements
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    And I select "Bodyweight" assistance work
    Then Assistance movement 1 is "One leg squat 5 sets 15x [?]lbs"
    And I tap assistance row 1
    And I change the custom movement name to "Good Morning"
    And I change the custom movement weight to 65
    And I tap the "Back" button
    Then Assistance movement 1 is "Good Morning 5 sets 15x 65lbs"
    And I tap the "Save" button
    Then I am on the track tab
    And I tap "Asst." to change the log type
    Then Assistance log entry 1 shows "Bodyweight Sit-ups Sets: 5 15x [?]"
    Then Assistance log entry 2 shows "Bodyweight Good Morning Sets: 5 15x 65"
