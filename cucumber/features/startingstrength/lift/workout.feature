@StartingStrength
Feature: Workouts
  Scenario: Lift weights are reflected in workouts
    When I navigate to the "Edit" tab
    When I set the "Bench" input to "225"
    When I set the "Squat" input to "300"
    When I set the "Deadlift" input to "400"
    And I navigate to the "Lift" tab
    Then There is a "Bench 3x5 225" list item
    Then There is a "Squat 3x5 300" list item
    Then There is a "Deadlift 1x5 400" list item

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