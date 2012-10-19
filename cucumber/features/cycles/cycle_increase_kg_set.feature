@531
Feature: Cycle increase is adjusted for kg
  As a lifter
  I want sensible default cycle increases
  So that I don't have to adjust the cycle increase manually

  Scenario: Set units to kg and check cycleIncrease
    When I set the squat max to 300
    When I set the deadlift max to 300
    When I set the press max to 100
    When I set the bench max to 100

    When I navigate to the settings page
    And I set units to kg

    When I navigate to the lift schedule
    And I click the increase cycle button
    And I tap the "Done" button
    Then The max for Squat is set to 305
    Then The max for Deadlift is set to 305
    Then The max for Press is set to 102.5
    Then The max for Bench is set to 102.5