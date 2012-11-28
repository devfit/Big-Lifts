@StartingStrength
Feature: Tracking Lifts

  Scenario: Tracking lifts
    When I navigate to the "Edit" tab
    When I set the "Bench" input to "225"
    When I set the "Squat" input to "300"
    When I set the "Deadlift" input to "400"
    And I navigate to the "Lift" tab
    And I tap the checkmark
    Then I am on the track tab
    Then There is a "Bench 3x5 225lbs" list item
    Then There is a "Squat 3x5 300lbs" list item
    Then There is a "Bench 5x1 400lbs" list item