@531
@premium
Feature: Custom - Arrange assistance
  Scenario: Viewing Custom lifts for non-default lifts
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