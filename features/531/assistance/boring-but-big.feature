@531
@premium
Feature: Boring But Big - Assistance Work

  Scenario: Viewing BBB lifts, Changing the percentage, and viewing the log
    When I set the squat max to 200
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    Then The first boring but big lift weight is 90
    And I set the BBB percentage to 60
    Then The first boring but big lift weight is 110
    And I tap the "Notes" button
    And I set the boring but big notes to "Felt okay. A little slow on the last set"
    And I return from the boring but big notes
    And I tap the "Save" button
    And I wait for the animation
    Then I am on the track tab
    And I tap the "Asst." button
    Then I see 1 assistance log entry for "10x110"
    And I tap "5x10" log entry 1
    Then The assistance details notes shows "Felt okay. A little slow on the last set"

  Scenario: BBB primary movements show plate breakdowns
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the first boring but big entry
    And I set the boring but big lift to "Press"
    And I tap the "Back" button
    Then List item 1 contains "[10,2.5]"

  Scenario: Deleting big lift
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Deadlift" list item
    And I tap the delete button
    Then There are 0 list items

  Scenario: BBB for non-default lifts
    When I add a new lift named "Clean" with max 200
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Clean" list item
    Then There is a "Clean" list item

  Scenario: Changes in the assistance list should be reflected immediately after a BBB entry is edited
    When I set the squat max to 200
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    Then I am on the track tab
    And I tap the "Asst." button
    Then I see 1 assistance log entry for "10x90"
    And I tap "5x10" log entry 1
    And I set the "Reps" input to "15"
    And I tap the "Back" button
    Then I see 1 assistance log entry for "15x90"

  Scenario: 0lbs does not render
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Press" list item
    And I tap the "Add..." button
    And I set the "name" to "Chins"
    And I tap the "Back" button
    Then List item 1 contains "10x"
    Then List item 2 does not contain "lbs"

  Scenario: Removing BBB additional lifts
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Press" list item
    And I tap the "Add..." button
    And I tap the trash button
    Then There are 1 list items
    And I tap the first boring but big entry

  Scenario: Adding BBB additional lifts
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Press" list item
    And I tap the "Add..." button
    And I set the "name" to "Chins"
    And I set the "reps" to "10"
    And I set the "sets" to "5"
    And I tap the "Back" button
    And I tap the "Save" button
    And I wait for the animation
    And I tap the "Asst." button
    Then I see an assistance log entry containing "Chins"

  Scenario: Boring But Big associated lift can be changed
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the first boring but big entry
    And I set the boring but big lift to "Press"
    And I tap the "Back" button
    Then List item 1 contains "Press"
    And I tap the "Save" button
    And I wait for the animation
    And I tap the "Asst." button
    Then I see an assistance log entry containing "Press"