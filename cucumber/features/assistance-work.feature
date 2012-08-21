@premium
Feature: Assistance Work

  Scenario: "None" assistance work isn't shown in the log
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select "None" assistance work
    And I tap "Asst." to change the log type
    Then There are no assistance log entries

  Scenario: Remembering the last assistance selection between workouts
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select "Boring But Big" assistance work
    And I save the boring but big assistance work
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select "None" assistance work
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    Then "None" assistance work is selected