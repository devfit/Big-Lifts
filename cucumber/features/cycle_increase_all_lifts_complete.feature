Feature: Increasing the cycle
  As a lifter
  I want to be able to increase the log cycle
  So that I can log more than one cycle's worth of lifts.

  Scenario: Check all lifts to increase the cycle
    When I navigate to the lift schedule
    When I check off all lifts
    And I hit done on the lift completion screen
    Then the cycle is increased