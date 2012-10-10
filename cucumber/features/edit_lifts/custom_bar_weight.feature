@premium
Feature: Different bar weights per lift
  Scenario: Clearing the bar weight reverts to using the global bar weight
    When I tap the "Edit" button
    And I click edit "Deadlift"
    And I set the custom bar weight to "50"
    And I tap the "Back" button
    And I tap the "Edit" button
    And I click edit "Deadlift"
    And I set the custom bar weight to ""
    And I tap the "Back" button
    And I set the deadlift max to 300
    And I view the deadlift lift schedule for week 1
    Then The plate breakdown for set 6 shows "[45,45,2.5]"

  Scenario: Changing an individual bar weight affects the plate breakdown
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I click edit "Deadlift"
    And I set the custom bar weight to "50"
    And I tap the "Back" button
    And I set the deadlift max to 300
    And I view the deadlift lift schedule for week 1
    Then The plate breakdown for set 6 shows "[45,45]"

