@premium
Feature: Assistance log

  Scenario: Viewing BBB lifts, Changing the percentage, and viewing the log
    When I set the squat max to 200
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    And I select "Boring But Big" assistance work
    And I tap the "Save" button
    Then I am on the track tab
    And I tap "Asst." to change the log type
    And I tap BBB log entry 1
    And I tap the assistance log notes
    And I set the assistance log notes to "Felt okay. Coulda been better"
    And I tap back
    Then The assistance log notes shows "Felt okay. Coulda been better"

  Scenario: Deleting assistance log entry
    When I set the squat max to 200
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    And I select "Boring But Big" assistance work
    And I tap the "Save" button
    And I view the squat lift schedule for week 2
    And I mark the current lift completed
    And I tap the "Save" button
    And I select "Boring But Big" assistance work
    And I tap the "Save" button
    Then I am on the track tab
    And I tap "Asst." to change the log type
    And I tap BBB log entry 1
    And I tap the delete assistance log button
    Then I am on the assistance log list
    And There are 1 assistance log entries