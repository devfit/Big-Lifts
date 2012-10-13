@premium
Feature: Boring But Big - Assistance Work

  Scenario: Changes in the assistance list should be reflected immediately after a BBB entry is edited
    When I set the squat max to 200
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select "Boring But Big" assistance work
    And I tap the "Save" button
    Then I am on the track tab
    And I tap "Asst." to change the log type
    Then I see 1 assistance log entry for "10x90"
    And I tap BBB log entry 1
    And I set the assistance log reps to 15
    And I tap the "Back" button
    Then I see 1 assistance log entry for "15x90"

  Scenario: Viewing BBB lifts, Changing the percentage, and viewing the log
    When I set the squat max to 200
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select "Boring But Big" assistance work
    Then The first boring but big lift weight is 90
    And I set the BBB percentage to 60
    Then The first boring but big lift weight is 110
    And I tap the "Notes" button
    And I set the boring but big notes to "Felt okay. A little slow on the last set"
    And I return from the boring but big notes
    And I tap the "Save" button
    Then I am on the track tab
    And I tap "Asst." to change the log type
    Then I see 1 assistance log entry for "10x110"
    And I tap BBB log entry 1
    Then The assistance details notes shows "Felt okay. A little slow on the last set"