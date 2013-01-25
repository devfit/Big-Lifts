@StartingStrength
@premium
Feature: Novice template

  Scenario: Setting Novice template
    When I navigate to the "Lift" tab
    And I tap the gear button
    And I tap the "Next" button
    And I tap the "Use" button
    And I wait for the animation
    And I tap the "OK" button
    And I wait for the animation
    Then I am on the starting strength workout
    And I navigate to the "Edit" tab
    Then There is not a "Power Clean" form label
    And I tap the "Lift" tab
    And I tap the "B" tab
    And I tap the "Warmup" button
    Then List item 3 contains "Deadlift"