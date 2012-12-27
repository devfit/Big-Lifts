@StartingStrength
Feature: Editing individual ss lifts

  Scenario: All lifts show up in edit tab
    When I navigate to the "Edit" tab
    And I tap the "Squat" gear icon
    Then There is a "Name" form label

  Scenario: Lift names can be changed
    When I navigate to the "Edit" tab
    And I tap the "Power Clean" gear icon
    And I set the "Name" input to "Row"
    And I tap the "Back" button
    Then There is a "Row" form label

