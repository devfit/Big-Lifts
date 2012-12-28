@StartingStrength
Feature: Workouts

  Scenario: The title is updated when the workout is switched
    When I navigate to the "Lift" tab
    And I tap the "B" tab
    Then The page title is "Workout B"

  Scenario: Lift weights are reflected in workouts
    When I navigate to the "Edit" tab
    When I set the "Bench" input to "225"
    When I set the "Squat" input to "300"
    When I set the "Deadlift" input to "400"
    And I navigate to the "Lift" tab
    Then There is a "Bench 3x 5 225"
    Then There is a "Squat 3x 5 300"
    Then There is a "Deadlift 1x 5 400"

  Scenario: Workout A
    When I navigate to the "Lift" tab
    Then There are 3 list items
    Then There is a "Squat"
    Then There is a "Bench"
    Then There is a "Deadlift"

  Scenario: Workout B
    When I navigate to the "Lift" tab
    And I tap the "B" tab
    Then There are 3 list items
    Then There is a "Squat"
    Then There is a "Press"
    Then There is a "Power Clean"