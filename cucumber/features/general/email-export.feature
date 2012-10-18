Feature: Email export
  As a lifter
  I want to export my lift log
  So that I can do data analysis and backup my data

  Scenario: One log entry export
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    And I tap the log export button
    And I set the email to test@test.com
    And I tap the send email button
    Then The email is currently set to test@test.com
    And The CSV to export is correct

