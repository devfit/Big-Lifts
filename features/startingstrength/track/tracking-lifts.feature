@StartingStrength
Feature: Tracking Lifts

  Scenario: Tracking lifts honors units
    When I navigate to the "Edit" tab
    And I set the "Bench" input to "225"
    And I navigate to the "More" tab
    And I tap the "Settings" list item
    And I set select "units" to "kg"
    And I tap the "Back" button
    And I navigate to the "Lift" tab
    And I tap the "Start" button
    And I tap the "Next" button
    And I tap the "Next" button
    And I tap the "Save" button
    And I wait for the animation
    Then I am on the track tab
    Then There is a "Bench 3x 5 225kg" list item

  Scenario: The track tab uses the combined log
    When I navigate to the "Edit" tab
    And I navigate to the "Lift" tab
    And I tap the "Start" button
    And I tap the "Next" button
    And I tap the "Next" button
    And I tap the "Save" button
    And I wait for the animation
    Then I am on the track tab
    Then There are 1 list items

  Scenario: Weights increase between sessions
    When I navigate to the "Edit" tab
    When I set the "Bench" input to "225"
    When I set the "Squat" input to "300"
    When I set the "Deadlift" input to "400"
    When I set the "Power Clean" input to "200"
    When I set the "Press" input to "120"
    And I navigate to the "Lift" tab

    And I tap the "Start" button
    And I tap the "Next" button
    And I tap the "Next" button
    And I tap the "Save" button

    And I navigate to the "Lift" tab
    And I set select "workout" to "B"

    And I tap the "Start" button
    And I tap the "Next" button
    And I tap the "Next" button
    And I tap the "Save" button

    And I navigate to the "Edit" tab
    Then The "Bench" input is "230"
    Then The "Squat" input is "320"
    Then The "Deadlift" input is "410"
    Then The "Power Clean" input is "205"
    Then The "Press" input is "125"

  Scenario: Tracking lifts
    When I navigate to the "Edit" tab
    When I set the "Bench" input to "225"
    When I set the "Squat" input to "300"
    When I set the "Deadlift" input to "400"
    And I navigate to the "Lift" tab

    And I tap the "Start" button
    And I tap the "Next" button
    And I tap the "Next" button
    And I tap the "Save" button

    And I wait for the animation
    Then I am on the track tab
    Then There is a "Bench 3x 5 225lbs" list item
    Then There is a "Squat 3x 5 300lbs" list item
    Then There is a "Deadlift 1x 5 400lbs" list item