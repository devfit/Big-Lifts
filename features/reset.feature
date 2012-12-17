@531
Feature: Resetting data

  Scenario: Resetting specific data stores
    When I tap the "More" tab
    And I tap the "Reset" list item
    Then The page title is "Reset"
    Then There is a "Reset All" button
    Then There is a "Lift Checkmarks" form label
    Then There is a "Reset" button
