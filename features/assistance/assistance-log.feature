@531
@premium
Feature: Assistance log
  Scenario: Deleting assistance log entry
    When I set the squat max to 200
    And I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    And I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    Then I am on the track tab
    And I tap the "Asst." button
    And I tap "5x10" log entry 1
    And I tap the delete assistance log button
    Then I am on the assistance log list
    And There are 1 assistance log entries

  Scenario: Viewing BBB lifts, Changing the percentage, and viewing the log
    When I set the squat max to 200
    And I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    Then I am on the track tab
    And I tap the "Asst." button
    And I tap "5x10" log entry 1
    And I tap the assistance log notes
    And I set the assistance log notes to "Felt okay. Coulda been better"
    And I tap the "Back" button
    Then The assistance log notes shows "Felt okay. Coulda been better"