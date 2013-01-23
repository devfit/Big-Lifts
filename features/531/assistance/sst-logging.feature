@531
@premium
Feature: Simplest Strength Template Logging
  Scenario: Setting maxes
    When I tap the assistance tab
    And I select "Simplest Strength Template" assistance work
    And I tap the "Deadlift" list item
    And I tap the "Maxes" button
    And I set the "Front Squat" input to "250"
    And I tap the "Back" button
    And I tap the "Save" button
    And I wait for the animation
    And I tap the "Asst." button
    Then There are 3 list items
    Then List item 3 contains "SST Front Squat Sets: 1 10x 125"