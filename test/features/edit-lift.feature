Feature: Editing lifts
  As a lifter
  I want to be able to edit lifts
  So that the lift schedule exactly matches my own preferred programming

  Scenario: Space in a lift name
  Scenario: newly added lift can be edited
    When I navigate to the lift editor
    And I click edit lifts
    And I click edit "Squat"
    And I edit the name to be "Squat "
    And I close the edit lift screen
    And I click edit lifts
    Then There are 4 lifts in the edit lifts list