@StartingStrength
Feature: Rest timer
  Scenario: The rest timer works
    When I navigate to the "Lift" tab
    And I tap the set counter
    Then The set counter shows "1"
    And I tap the set counter
    Then The set counter shows "2"
    And I tap the set counter clear
    Then The set counter shows "0"