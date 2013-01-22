@StartingStrength
Feature: SS Config

  Scenario: No premium user promo text
    When I navigate to the "Lift" tab
    And I tap the gear button
    Then The starting strength config page includes "Big Lifts Pro"
