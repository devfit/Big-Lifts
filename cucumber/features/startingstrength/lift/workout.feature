@StartingStrength
Feature: Workouts

  Scenario: Workout A
    When I navigate to the "Lift" tab
    Then There are 3 list items
    Then There is a "Squat" list item
    Then There is a "Bench" list item
    Then There is a "Deadlift" list item

  Scenario: Workout B
    When I navigate to the "Lift" tab
    And I tap the "B" tab
    Then There are 3 list items
    Then There is a "Squat" list item
    Then There is a "Press" list item
    Then There is a "Power Clean" list item