@StartingStrength
@premium
Feature: Bar Loading

  Scenario: Bar loading for Squat
    When I tap the "Edit" tab
    And I set the "Squat" input to "200"
    And I tap the "Lift" tab
    And I tap the "Start" button
    Then List item 2 contains "[10,5,2.5]"