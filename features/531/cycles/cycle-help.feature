@531
Feature: Help during cycle increase

  Scenario: Cycle increases are persisted
    When I navigate to the lift schedule
    And I tap the "Cycle 1" button
    And I tap the question mark button
    And I set the "Press" input to "10"
    And I tap the "Back" button
    And I tap the question mark button
    Then The "Press" input is "10"