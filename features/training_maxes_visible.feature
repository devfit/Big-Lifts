@531
Feature: Training maxes in the maxes editor
  As a lifter
  I want to see the training max being used in the maxes editor,
  So that I know if I'm using the training max or not

  Scenario: Training max togging
    When I navigate to the "More" tab
    And I tap the "Settings"
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
    Then The training max for clean is shown