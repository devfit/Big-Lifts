Feature: Editing lifts
  As a lifter
  I want to be able to edit lifts
  So that the lift schedule exactly matches my own preferred programming

  Scenario: Editing a lift does not break ordering
    When I navigate to the lift editor
    And I click edit lifts
    And I click edit "Squat"
    And I close the edit lift screen
    Then The sort ordering is sensible

  Scenario: Max with a decimal point
    When I navigate to the lift editor
    And I click edit lifts
    And I click edit "Squat"
    And I edit the max to be 100.5
    And I close the edit lift screen
    Then I see no error dialog

  Scenario: Space in a lift name
    When I navigate to the lift editor
    And I click edit lifts
    And I click edit "Squat"
    And I edit the name to be "Squat "
    And I close the edit lift screen
    And I click edit lifts
    Then There are 4 lifts in the edit lifts list