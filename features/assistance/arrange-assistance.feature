@531
@premium
Feature: Custom - Arrange assistance

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
    Then Assistance movement 1 is "Move1 5 sets 15x"
    Then Assistance movement 2 is "Move2 5 sets 15x"
    And I tap the "Arrange" button
    And I tap the "Move1" list item
    And I tap the move down button
    And I tap the "Done" button
    Then Assistance movement 1 is "Move2 5 sets 15x"
