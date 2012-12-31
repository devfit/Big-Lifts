@531
Feature: Increasing the cycle
  As a lifter
  I want to be able to increase the log cycle
  So that I can log more than one cycle's worth of lifts.

  Scenario: Click increase cycle button
    When I navigate to the lift schedule
    And I tap the "Cycle 1" button
    And I tap the "Done" button
    Then The cycle is "2"

  Scenario: Cancel on after clicking increase cycle button
    When I navigate to the lift schedule
    And I tap the "Cycle 1" button
    And I tap the "Cancel" button
    Then The cycle is "1"

  Scenario: Going down a cycle
    When I navigate to the lift schedule
    And I tap the "Cycle 1" button
    And I tap the "Done" button
    And I tap the "Cycle 2" button
    And I set the next cycle to 1
    And I tap the "Done" button
    Then The cycle is "1"