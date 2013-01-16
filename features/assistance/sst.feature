@531
@premium
Feature: Simplest Strength Template

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