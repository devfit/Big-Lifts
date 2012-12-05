@531
Feature: Weeks checked when completed
  As a lifter
  I want to be able to know which week I'm on
  So I don't navigate tabs confusedly looking for my lift.

  Scenario: Check off all the week one lifts
    When I view the squat lift schedule for week 1
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    When I view the deadlift lift schedule for week 1
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    When I view the press lift schedule for week 1
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    When I view the bench lift schedule for week 1
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    And I navigate to the lift schedule
    Then The week 1 tab is checked