Feature: Lift log sorting
  As a lifter
  I want to be able to sort the lifts in track by date and name
  So that I can see data in a better way

  Scenario: Sort A-Z
    When I view the press lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    When I view the press lift schedule for week 2
    And I mark the current lift completed
    And I save the lift log
    And I tap the sort lift log button
    And I tap sort "A-Z"
    Then The log list shows "Press,Press,Squat"