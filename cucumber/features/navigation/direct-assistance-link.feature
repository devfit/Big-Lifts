@premium
@531
Feature: Direct assistance tab for premium users
  Scenario: Main navigation tabs
    Then There is a "Asst." navigation tab

  Scenario: 1RM calculator in more list
    When I navigate to the more tab
    Then "1RM Calculator" is in the more info list
    And I tap the "1RM Calculator" list item
    Then I am on the one rep max screen
    And I tap the "Back" button
    Then I am on the more tab