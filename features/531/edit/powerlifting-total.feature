@531
Feature: Powerlifting Total

  Scenario: Disabling lifts hides the powerlifting total
    When I navigate to the lift editor
    When I set the "Bench" input to "200"
    When I set the "Squat" input to "320"
    When I set the "Deadlift" input to "400"
    And I tap the powerlifting config gear
    And I tap the "Squat" input
    And I tap the "Back" button
    Then The powerlifting total is "600"

  Scenario: Disabling lifts hides the powerlifting total
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I disable "Squat"
    And I tap the "Done" button
    Then The powerlifting total is hidden

  Scenario: No log entries
    When I navigate to the lift editor
    When I set the "Bench" input to "201"
    When I set the "Squat" input to "320"
    When I set the "Deadlift" input to "400"
    When I set the "Press" input to "100"
    Then The powerlifting total is "921"


