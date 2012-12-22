@StartingStrength
Feature: Rest timer
  Scenario: The rest timer works
    When I navigate to the "Lift" tab
    And I tap the rest timer button
    And I tap the increment rest timer button
    Then The rest timer shows "0:03"
    And I tap the "Start" button
    And I wait 4 seconds
    Then I am on the starting strength workout