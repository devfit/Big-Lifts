@531
@premium
Feature: Simplest Strength Template

  Scenario: Front Squat
    When I tap the assistance tab
    And I select "Simplest Strength Template" assistance work
    And I tap the "Deadlift" list item
    Then There are 3 list items
    Then List item 1 contains "Front Squat 10x"
