@premium
Feature: bar loading - custom plates
  As a lifter
  I want to be able to use custom plate configurations
  So that I can exactly describe what weights I have for the bar loading assistance

  Scenario: Adding 2kg
    When I navigate to the lift editor
    And I tap the bar/plates button
    And I set the new plate weight to 2
    And I tap add new plate
    Then There are 7 custom plate entries

  Scenario: No duplicate weights are allowed
    When I navigate to the lift editor
    And I tap the bar/plates button
    And I set the new plate weight to 10
    And I tap add new plate
    Then There are 6 custom plate entries

  Scenario: Adding an empty weight does not add a plate
    When I navigate to the lift editor
    And I tap the bar/plates button
    And I tap add new plate
    Then There are 6 custom plate entries

  Scenario: Removing plate configurations
    When I navigate to the lift editor
    And I tap the bar/plates button
    And I tap remove plate
    Then There are 5 custom plate entries

  Scenario: Adding 20kg
    When I navigate to the lift editor
    And I tap the bar/plates button
    And I set the new plate weight to 20
    And I tap add new plate
    Then There are 7 custom plate entries