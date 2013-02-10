@531
@premium
Feature: Assistance log
  Scenario: Adjusting assistance log date
    When I set the squat max to 200
    And I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    And I wait for the animation

    And I tap the "Asst." button
    And I tap the "Squat" list item
    And I change the "assistance-log-date" date to "09/14/2011"
    And I tap the "Back" button
    Then List item 1 contains "09/14/2011"

  Scenario: Deleting assistance log entry
    When I set the squat max to 200
    And I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    And I wait for the animation

    And I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    And I wait for the animation

    Then I am on the track tab
    And I tap the "Asst." button
    And I tap "5x10" log entry 1
    And I tap the delete button
    Then I am on the assistance log list
    And There are 1 list items

  Scenario: Viewing BBB lifts, Changing the percentage, and viewing the log
    When I set the squat max to 200
    And I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    And I wait for the animation

    Then I am on the track tab
    And I tap the "Asst." button
    And I tap "5x10" log entry 1
    And I tap the assistance log notes
    And I set the assistance log notes to "Felt okay. Coulda been better"
    And I tap the "Back" button
    Then The assistance log notes shows "Felt okay. Coulda been better"