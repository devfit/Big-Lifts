@StartingStrength
Feature: Arranging SS workouts

  Scenario: Arranging workout A
    When I navigate to the "Lift" tab
    And I tap the "Arrange" button
    Then There are 3 list items
    Then List item 1 contains "Squat"
    Then List item 2 contains "Bench"
    And I tap the "Squat" list item
    And I tap the move down button
    And I tap the move down button
    And I tap the move up button
    Then List item 1 contains "Bench"
    Then List item 2 contains "Squat"
    Then List item 3 contains "Deadlift"
    And I tap the "Done" button
    Then There are 3 list items
    Then List item 1 contains "Bench"