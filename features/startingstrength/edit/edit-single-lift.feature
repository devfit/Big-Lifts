@StartingStrength
Feature: Editing individual ss lifts

  Scenario: Increases can be changed
    When I navigate to the "Edit" tab
    When I set the "Squat" input to "200"
    And I tap the "Squat" gear icon
    And I set the "Increase" input to "5"
    And I tap the "Back" button
    And I navigate to the "Lift" tab
    And I tap the checkmark
    And I wait for the animation
    And I tap the "Edit" tab
    Then The "Squat" input is "205"

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