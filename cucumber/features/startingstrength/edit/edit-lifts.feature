@StartingStrength
Feature: Editing lifts

  Scenario: All lifts show up in edit tab
    When I navigate to the "Edit" tab
    Then There is a "Squat" form label
    Then There is a "Bench" form label
    Then There is a "Deadlift" form label
    Then There is a "Press" form label
    Then There is a "Power Clean" form label

  Scenario: Editing inputs changes associated lift values
    When I navigate to the "Edit" tab
    When I edit the "Bench" input to be "300"
    When I edit the "Squat" input to be "400"
    Then The Starting Strength "Bench" lift is "300"