Feature: Lift tracking
  As a lifter
  I want to be able to track my lifts
  To view my progress over time

  Scenario: Lift logging
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    Then I do see a log entry containing Squat

  Scenario: Deleting a lift log
    When I view the press lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select the log entry for Press
    And I tap delete for a log entry
    Then I do not see a log entry containing Press




