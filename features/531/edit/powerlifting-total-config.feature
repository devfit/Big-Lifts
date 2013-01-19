@531
Feature: Powerlifting Total Config

  Scenario: Use Estimates off
    When I navigate to the lift editor
    When I set the "Bench" input to "200"
    When I set the "Squat" input to "200"
    When I set the "Deadlift" input to "200"
    Then The powerlifting total is "600"

    And I view the squat lift schedule for week 1
    And I tap the checkmark
    And I set the "Reps" input to "10"
    And I tap the "Save" button
    And I wait for the animation

    And I navigate to the lift editor
    Then The powerlifting total is "606"

    And I tap the powerlifting config gear
    And I tap the "Use Estimates" checkbox
    And I tap the "Back" button
    Then The powerlifting total is "600"


