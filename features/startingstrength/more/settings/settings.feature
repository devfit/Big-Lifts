@StartingStrength
Feature: StartingStrength Settings

  Scenario: Navigating to settings
    When I navigate to the "More" tab
    And I tap the "Settings" list item
    Then There is a "Units" form label
