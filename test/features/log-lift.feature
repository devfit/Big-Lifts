Feature: Lift tracking
  As a lifter
  I want to be able to track my lifts
  To view my progress over time

  Scenario: Lift log can be editted
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select the log entry for Squat
    And I set the log expected reps to 6
    And I set the log reps to 2
    And I tap back in the lift log
    And I select the log entry for Squat
    Then The log expected reps is 6
    Then The log reps is 2

  Scenario: Notes aren't persisted between lifts
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap edit first log notes
    And I set the first log notes to "Log notes"
    And I save the lift log

    And I view the press lift schedule for week 1
    And I mark the current lift completed
    Then The current notes shows "Tap to edit"
    And I tap edit first log notes
    Then The full log notes shows ""

  Scenario: Backing out of the lift log
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap back in the lift log
    Then I am returned to the lift schedule and no log is saved

  Scenario: Lift logging
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap edit first log notes
    And I set the first log notes to "Log notes"
    And I save the lift log
    Then I do see a log entry containing Squat
    And I select the log entry for Squat
    Then the log notes are "Log notes"
    Then The log date is today

  Scenario: Editing notes and viewing date
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select the log entry for Squat
    Then The log date is today
    And I tap edit log notes
    And I return from editing the log notes
    Then The log date is today
    And I return from viewing a log
    Then The squat long entry date in the log list is today

  Scenario: Deleting a lift log
    When I view the press lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select the log entry for Press
    And I tap delete for a log entry
    Then I do not see a log entry containing Press




