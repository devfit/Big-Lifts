@531
Feature: Powerlifting Total

  Scenario: No log entries
    When I navigate to the lift editor
    When I set the "Bench" input to "201"
    When I set the "Squat" input to "320"
    When I set the "Deadlift" input to "400"
    When I set the "Press" input to "100"
    Then The powerlifting total is "921"


