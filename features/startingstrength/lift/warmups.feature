@StartingStrength
Feature: Workouts

  Scenario: Warmup weights are percentages of the set weight
    When I navigate to the "Edit" tab
    When I set the "Bench" input to "225"
    And I navigate to the "Lift" tab
    Then There is a "Bench 2x 5 45lbs" list item
    Then There is a "Bench 3x 5 225lbs" list item