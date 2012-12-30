@531
@premium
Feature: Custom - Arrange assistance
  Scenario: Arranging BBB
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Add..." button
    And I set the "Name" input to "Chins"
    And I tap the "Back" button
    And I tap the "Arrange" button
    Then List item 1 contains "Squat"
    Then List item 2 contains "Chins"
    And I tap the "Chins" list item
    And I tap the move up button
    Then List item 1 contains "Chins"
    And I tap the "Done" button
    Then List item 1 contains "Chins"

  Scenario: Adding a new lift with ordering in effect
    When I tap the assistance tab
    And I select "Custom" assistance work
    And I tap the "Squat" list item
    And I tap the "Add..." button
    Then The "Name" input is ""

  Scenario: Arranging assistance
    When I tap the assistance tab
    And I select "Custom" assistance work
    And I tap the "Squat" list item
    And I tap assistance row 1
    And I set the "Name" input to "Move1"
    And I tap the "Back" button
    And I tap assistance row 2
    And I set the "Name" input to "Move2"
    And I tap the "Back" button
    Then List item 1 contains "Move1 5 sets 15x"
    Then List item 2 contains "Move2 5 sets 15x"
    And I tap the "Arrange" button
    And I tap the "Move1" list item
    And I tap the move down button
    And I tap the "Done" button
    Then List item 1 contains "Move2 5 sets 15x"
