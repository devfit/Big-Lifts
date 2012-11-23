@531
Feature: Switching routines
  Scenario: Switching out and back in to 5/3/1
    When I navigate to the more tab
    And I tap the "Routine" list item
    Then I am on the routine chooser
    And I tap the "5/3/1" list item
    Then There is a "Lift!" tab
    Then There is a "Edit" tab
    Then There is a "Track" tab
    Then There is a "1-Rep" tab
    Then There is a "More" tab
