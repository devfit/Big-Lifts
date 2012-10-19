@531
Feature: Increasing the cycle
  As a lifter
  I want to be able to increase the log cycle
  So that I can log more than one cycle's worth of lifts.

  Scenario: Click increase cycle button
    When I navigate to the lift schedule
    And I click the increase cycle button
    And I tap the "Done" button
    Then the cycle is increased

  Scenario: Cancel on after clicking increase cycle button
    When I navigate to the lift schedule
    And I click the increase cycle button
    And I hit cancel on the increase cycle screen
    Then the cycle is not increased

  Scenario: Going down a cycle
    When I navigate to the lift schedule
    And I click the increase cycle button
    And I tap the "Done" button
    And I click the increase cycle button
    And I set the next cycle to 1
    Then the cycle is not increased