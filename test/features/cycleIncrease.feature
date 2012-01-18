Feature: Increasing the cycle
  As a lifter
  I want to be able to increase the log cycle
  So that I can log more than one cycle's worth of lifts.

  Scenario: Increase the cycle
    When I check off lifts for week 1
    And I check off lifts for week 2
    And I check off lifts for week 3
    And I check off lifts for week 4
    And I hit done on the lift completion screen
    Then the cycle is increased