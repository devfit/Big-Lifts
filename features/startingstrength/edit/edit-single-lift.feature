@StartingStrength
Feature: Editing individual ss lifts

  Scenario: All lifts show up in edit tab
    When I navigate to the "Edit" tab
    And I tap the "Squat" gear icon
    Then There is a "Name" form label
