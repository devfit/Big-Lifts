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

  Scenario: Setting standard template after novice
    When I navigate to the "Lift" tab
    And I tap the gear button
    And I tap the "Next" button
    And I tap the "Use" button
    And I wait for the animation
    And I tap the "OK" button
    And I wait for the animation
    And I tap the gear button
    And I wait for the animation

    Then The title says "Standard"

    And I tap the "Use" button
    And I wait for the animation
    And I tap the "OK" button
    And I wait for the animation

    And I navigate to the "Edit" tab
    Then There is a "Power Clean" form label
    And I tap the "Lift" tab
    And I tap the "B" tab
    And I tap the "Warmup" button
    Then List item 3 contains "Power Clean"