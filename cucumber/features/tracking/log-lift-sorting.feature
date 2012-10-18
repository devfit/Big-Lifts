Feature: Lift log sorting
  As a lifter
  I want to be able to sort the lifts in track by date and name
  So that I can see data in a better way

  Scenario: Sort A-Z
    When I view the press lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    When I view the press lift schedule for week 2
    And I mark the current lift completed
    And I tap the "Save" button
    And I tap the sort lift log button
    And I tap sort "A-Z"
    Then The log list shows "Press,Press,Squat"

  Scenario: Sort Z-A
    When I view the press lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    When I view the press lift schedule for week 2
    And I mark the current lift completed
    And I tap the "Save" button
    And I tap the sort lift log button
    And I tap sort "A-Z"
    And I tap sort "A-Z"
    Then The log list shows "Squat,Press,Press"

  Scenario: Default sort by newest
    When I view the press lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    When I view the bench lift schedule for week 2
    And I mark the current lift completed
    And I tap the "Save" button
    Then The log list shows "Bench,Squat,Press"

  Scenario: Sort by oldest
    When I view the press lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    When I view the bench lift schedule for week 2
    And I mark the current lift completed
    And I tap the "Save" button
    And I tap the sort lift log button
    And I tap sort "Newest"
    Then The log list shows "Press,Squat,Bench"