@531
Feature: Lift log sorting
  Scenario: Sort A-Z
    When I view the press lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the press lift schedule for week 2
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    And I tap the sort lift log button
    And I tap sort "A-Z"
    Then The log list shows "Press,Press,Squat"

  Scenario: Sort A-Z has date sub-sorting
    When I view the press lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the press lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the press lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the press lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    And I select the log entry 1
    And I change the log date to "02/14/2011"
    And I tap the "Back" button

    And I select the log entry 1
    And I change the log date to "10/14/2011"
    And I tap the "Back" button

    And I select the log entry 1
    And I change the log date to "06/14/2011"
    And I tap the "Back" button

    And I select the log entry 1
    And I change the log date to "09/14/2011"
    And I tap the "Back" button

    And I tap the sort lift log button
    And I tap sort "A-Z"
    Then The log list dates show "10/14/2011,09/14/2011,06/14/2011,02/14/2011"

  Scenario: Sort Z-A
    When I view the press lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the press lift schedule for week 2
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    And I tap the sort lift log button
    And I tap sort "A-Z"
    And I tap sort "A-Z"
    Then The log list shows "Squat,Press,Press"

  Scenario: Default sort by newest
    When I view the press lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the bench lift schedule for week 2
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    Then The log list shows "Bench,Squat,Press"

  Scenario: Sort by oldest
    When I view the press lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    When I view the bench lift schedule for week 2
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the navigation

    And I tap the sort lift log button
    And I tap sort "Newest"
    Then The log list shows "Press,Squat,Bench"