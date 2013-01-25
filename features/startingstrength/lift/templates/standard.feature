@StartingStrength
@premium
Feature: Standard template

  Scenario: Setting standard template
    When I navigate to the "Lift" tab
    And I tap the gear button
    Then The starting strength config page includes "3x5 Squat"
    And I tap the "Use" button
    And I wait for the animation
    And I tap the "OK" button
    And I wait for the animation
    Then I am on the starting strength workout