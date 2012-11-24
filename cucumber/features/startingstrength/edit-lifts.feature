@StartingStrength
Feature: Editing lifts

  Scenario: All lifts show up in edit tab
    When I navigate to the "Edit" tab
    Then There is a "Squat" form label
    Then There is a "Bench" form label
    Then There is a "Deadlift" form label
    Then There is a "Press" form label
    Then There is a "Power Clean" form label

