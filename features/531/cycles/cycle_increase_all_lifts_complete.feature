@531
Feature: Increasing the cycle

  Scenario: Check all lifts to increase the cycle
    When I navigate to the lift schedule
    And I check off all lifts but bench week 4
    And I view the bench lift schedule for week 4
    And I tap the checkmark
    And I tap the "Save" button
    And I tap the "Done" button
    Then The cycle is "2"

  Scenario: Week checkmarks are removed when a cycle is completed
    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    When I view the deadlift lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    When I view the press lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    When I view the bench lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    When I navigate to the lift schedule
    And I tap the "Cycle 1" button
    And I tap the "Done" button

    And I navigate to the lift schedule
    And I select week 2
    Then The week 1 tab does not have a checkmark