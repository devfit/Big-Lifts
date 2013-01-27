@531
Feature: Training maxes in the maxes editor
  Scenario: Training maxes are updated after edit
    When I navigate to the "Edit" tab
    And I set the "Press" input to "300"
    Then The "Press" training max is "270"

  Scenario: Training max toggling
    When I navigate to the "More" tab
    And I tap the "Settings" list item
    And I toggle use training max
    And I navigate to the lift editor
    Then Training maxes are not visible
    When I navigate to the "More" tab
    And I toggle use training max
    And I navigate to the lift editor
    Then Training maxes are visible

  Scenario: Training max is enabled
    When I navigate to the lift editor
    Then Training maxes are visible

  Scenario: Training max is disabled
    When I navigate to the settings page
    And I toggle use training max
    And I navigate to the lift editor
    Then Training maxes are not visible

  Scenario: I add a lift and edit its max
    When I add a new lift named "Clean" with max 200
    And I navigate to the lift editor
    Then The training max for "Clean" is shown