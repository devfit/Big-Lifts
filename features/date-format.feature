@531
Feature: Using a different date format for the log
  As a lifter
  I want to be able to use the international date format
  So that I can understand my log

  Scenario: International date formatting
    When I navigate to the settings page
    And I select Day/Month/Year for the date format
    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    Then The date for the log entry for Squat is dd/MM/yyyy