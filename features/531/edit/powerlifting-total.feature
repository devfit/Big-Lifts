@531
Feature: Powerlifting Total

  Scenario: Powerlifting total options are persisted
    When I navigate to the lift editor
    And I tap the powerlifting config gear
    And I tap the "Squat" checkbox
    And I tap the "Back" button
    And I tap the powerlifting config gear
    Then The "Squat" checkbox is unchecked

  Scenario: Disabling lifts hides the powerlifting total
    When I navigate to the lift editor
    When I set the "Bench" input to "200"
    When I set the "Squat" input to "320"
    When I set the "Deadlift" input to "400"
    And I tap the powerlifting config gear
    And I tap the "Squat" checkbox
    And I tap the "Back" button
    Then The powerlifting total is "600"

  Scenario: No log entries
    When I navigate to the lift editor
    When I set the "Bench" input to "201"
    When I set the "Squat" input to "320"
    When I set the "Deadlift" input to "400"
    When I set the "Press" input to "100"
    Then The powerlifting total is "921"


