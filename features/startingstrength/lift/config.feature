@StartingStrength
Feature: SS Config

  Scenario: Non-pro user promo text
    When I navigate to the "Lift" tab
    And I tap the gear button
    Then The starting strength config page includes "Big Lifts Pro"

  @premium
  Scenario: Pro user does not have promo text
    When I navigate to the "Lift" tab
    And I tap the gear button
    Then The starting strength config page does not include "Big Lifts Pro"
