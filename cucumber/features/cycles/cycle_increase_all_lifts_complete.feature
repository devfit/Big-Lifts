@531
Feature: Increasing the cycle
  As a lifter
  I want to be able to increase the log cycle
  So that I can log more than one cycle's worth of lifts.

  Scenario: Check all lifts to increase the cycle
    When I navigate to the lift schedule
    And I check off all lifts but bench week 4
    And I view the bench lift schedule for week 4
    And I tap the checkmark
    And I tap the "Save" button
    And I tap the "Done" button
    Then the cycle is increased

  Scenario: Week checkmarks are removed when a cycle is completed
    When I view the squat lift schedule for week 1
    When I mark the current lift completed
    And I tap the "Save" button

    When I view the deadlift lift schedule for week 1
    When I mark the current lift completed
    And I tap the "Save" button

    When I view the press lift schedule for week 1
    When I mark the current lift completed
    And I tap the "Save" button

    When I view the bench lift schedule for week 1
    When I mark the current lift completed
    And I tap the "Save" button

    When I navigate to the lift schedule
    And I click the increase cycle button
    And I tap the "Done" button

    And I navigate to the lift schedule
    And I select week 2
    Then The week 1 tab does not have a checkmark