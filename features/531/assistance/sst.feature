@531
@premium
Feature: Simplest Strength Template

  Scenario: Maxes are persisted
    When I tap the assistance tab
    And I select "Simplest Strength Template" assistance work
    And I tap the "Deadlift" list item
    And I tap the "Maxes" button
    And I set the "Front Squat" input to "250"
    And I tap the "Back" button
    And I tap the "Maxes" button
    Then The "Front Squat" input is "250"

  Scenario: Starting week is inferred
    When I view the squat lift schedule for week 1
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation
    When I view the squat lift schedule for week 2
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation
    When I tap the assistance tab
    And I select "Simplest Strength Template" assistance work
    And I tap the "Squat" list item
    Then The "week" select is set to "2"

  Scenario: Setting maxes
    When I tap the assistance tab
    And I select "Simplest Strength Template" assistance work
    And I tap the "Deadlift" list item
    Then List item 1 contains "Front Squat 10x"
    And I tap the "Maxes" button
    And I set the "Front Squat" input to "250"
    And I tap the "Back" button
    Then List item 1 contains "Front Squat 10x 125lbs"

  Scenario: Week selector
    When I tap the assistance tab
    And I select "Simplest Strength Template" assistance work
    And I tap the "Deadlift" list item
    Then There are 3 list items
    Then List item 1 contains "Front Squat 10x"
    When I select "2" from the "week" selector
    Then List item 1 contains "Front Squat 8x"