@531
Feature: Deleting a lift unmarks a completed lift

  Scenario: Editing notes and viewing date
    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation
    And I tap the "Track" tab
    And I tap the "Squat" list item
    And I tap the delete button
    And I tap the "Lift" tab
    Then The "Squat" list item is not checked