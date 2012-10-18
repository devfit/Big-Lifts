Feature: Weeks checked when completed
  As a lifter
  I want to be able to know which week I'm on
  So I don't navigate tabs confusedly looking for my lift.

  Scenario: Check off all the week one lifts
    When I view the squat lift schedule for week 1
    When I mark the current lift completed
    And I save the lift log

    When I view the deadlift lift schedule for week 1
    When I mark the current lift completed
    And I save the lift log

    When I view the press lift schedule for week 1
    When I mark the current lift completed
    And I save the lift log

    When I view the bench lift schedule for week 1
    When I mark the current lift completed
    And I save the lift log

    And I navigate to the lift schedule
    Then The week 1 tab is checked