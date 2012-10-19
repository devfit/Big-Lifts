@531
Feature: Auto-increment lift maxes
  As a lifter
  I want to be able to auto-increment my maxes at the end of a cycle
  So that I don't have to up my maxes manually

  Scenario: Check lifts by week
    When I set the squat max to 200
    When I set the press max to 100
    And I navigate to the lift schedule
    And I check off all lifts
    And I tap the "Done" button
    Then squat max is set to 210
    Then press max is set to 105

  Scenario: Fractional lift increase
    When I set the squat max to 200
    And I tap the "Edit" button
    And I click edit "Squat"
    And I edit the cycle increase to be 2.5
    And I tap the "Back" button
    And I navigate to the lift schedule
    And I check off all lifts
    And I tap the "Done" button
    Then squat max is set to 202.5