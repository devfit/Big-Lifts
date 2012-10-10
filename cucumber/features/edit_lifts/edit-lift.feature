Feature: Editing lifts
  As a lifter
  I want to be able to edit lifts
  So that the lift schedule exactly matches my own preferred programming

  Scenario: Editing a lift does not break ordering
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I click edit "Squat"
    And I tap the "Back" button
    Then The sort ordering is sensible

  Scenario: Max with a decimal point
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I click edit "Squat"
    And I edit the max to be 100.5
    And I tap the "Back" button
    Then I see no error dialog

  Scenario: Space in a lift name
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I click edit "Squat"
    And I edit the name to be "Squat "
    And I tap the "Back" button
    And I tap the "Edit" button
    Then There are 4 lifts in the edit lifts list

  Scenario: Lift can be saved immediately after its name is changed
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I click edit "Squat"
    And I edit the name to be "Squat2"
    And I tap the "Back" button
    And I view the squat2 lift schedule for week 1
    When I mark the current lift completed
    And I save the lift log
    Then I am on the track tab