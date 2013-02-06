@531
@premium
Feature: bar loading - custom plates

  Scenario: Editing 2kg and avoid ExtJS store bugs
    When I navigate to the lift editor
    And I tap the "Bar/Plates" button
    And I set the new plate weight to 2
    And I tap the "Add" button
    And I set the "2lbs" input to "8"
    And I tap the "Back" button
    And I tap the "Bar/Plates" button
    Then The "2lbs" input is "8"

  Scenario: Not having enough plates to make a weight
    When I navigate to the lift editor
    And I tap the "Bar/Plates" button
    And I tap the "Remove" button
    And I tap the "Remove" button
    And I tap the "Remove" button
    And I tap the "Remove" button
    And I tap the "Remove" button
    And I tap the "Back" button
    And I view the squat lift schedule for week 1
    Then The plate breakdown for set 6 shows "[45]"

  Scenario: Adding 2kg and avoid ExtJS store bugs
    When I navigate to the lift editor
    And I tap the "Bar/Plates" button
    And I set the new plate weight to 2
    And I tap the "Add" button
    Then There are 7 custom plate entries

  Scenario: No duplicate weights are allowed
    When I navigate to the lift editor
    And I tap the "Bar/Plates" button
    And I set the new plate weight to 10
    And I tap the "Add" button
    Then There are 6 custom plate entries

  Scenario: Adding an empty weight does not add a plate
    When I navigate to the lift editor
    And I tap the "Bar/Plates" button
    And I tap the "Add" button
    Then There are 6 custom plate entries

  Scenario: Removing plate configurations
    When I navigate to the lift editor
    And I tap the "Bar/Plates" button
    And I tap the "Remove" button
    Then There are 5 custom plate entries

  Scenario: Adding 20kg
    When I navigate to the lift editor
    And I tap the "Bar/Plates" button
    And I set the new plate weight to 20
    And I tap the "Add" button
    Then There are 7 custom plate entries