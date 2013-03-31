@531
Feature: Checking off individual lifts
  Scenario: Check lift indicator is set before each lift is viewed
    When I view the squat lift schedule for week 1
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation
    And I navigate to the lift schedule
    Then The "Squat" list item is checked
