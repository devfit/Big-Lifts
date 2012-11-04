@531
Feature: Filtering log by cycle

  Scenario: Lift log can be editted
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    When I navigate to the lift schedule
    And I click the increase cycle button
    And I tap the "Done" button
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    Then There are 2 log entries
    And I set the log cycle filter to "1"
    Then There are 1 log entries