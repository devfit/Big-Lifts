@premium
Feature: Different bar weights per lift

  Scenario: Lift can be saved immediately after its name is changed
    When I navigate to the lift editor
    And I click edit lifts
    And I click edit "Deadlift"
    And I set the custom bar weight to 50
    And I tap the "Back" button
    And I set the deadlift max to 300
    And I view the deadlift lift schedule for week 1
    Then The plate breakdown for set 6 shows "[45,45]"
