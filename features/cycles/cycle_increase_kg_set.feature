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
    And I set select "units" to "kg"

    When I navigate to the lift schedule
    And I click the increase cycle button
    And I tap the "Done" button
    And I navigate to the lift editor
    Then The "Squat" input is "305"
    Then The "Deadlift" input is "305"
    Then The "Press" input is "102.5"
    Then The "Bench" input is "102.5"