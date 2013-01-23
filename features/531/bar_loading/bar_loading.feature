@531
@premium
Feature: Bar loading

  Scenario: Custom plates can be persisted
    When I navigate to the lift editor
    And I tap the "Bar/Plates" button
    And I set the number of 10lbs plates to 0
    And I tap the "Back" button
    And I tap the "Bar/Plates" button
    And I tap the "Back" button

  Scenario: Custom plates - no 10s
    When I navigate to the lift editor
    And I tap the "Bar/Plates" button
    And I set the number of 10lbs plates to 0
    And I tap the "Back" button
    And I view the squat lift schedule for week 1
    Then The plate breakdown for set 2 shows "[5,5,5,2.5,2.5,2.5]"

  Scenario: 35lb bar
    When I navigate to the lift editor
    And I tap the "Bar/Plates" button
    And I set the bar weight to 35
    And I tap the "Back" button
    And I view the squat lift schedule for week 1
    Then The plate breakdown for set 1 shows "[10,5,2.5]"
    Then The plate breakdown for set 2 shows "[25,2.5]"
    Then The plate breakdown for set 3 shows "[35,2.5]"
    Then The plate breakdown for set 4 shows "[35,5]"
    Then The plate breakdown for set 5 shows "[45,5]"
    Then The plate breakdown for set 6 shows "[45,10,5]"

  Scenario: Default bar settings
    When I view the squat lift schedule for week 1
    Then The plate breakdown for set 1 shows "[10,2.5]"
    Then The plate breakdown for set 2 shows "[10,10,2.5]"
    Then The plate breakdown for set 3 shows "[25,5,2.5]"
    Then The plate breakdown for set 4 shows "[35]"
    Then The plate breakdown for set 5 shows "[45]"
    Then The plate breakdown for set 6 shows "[45,10]"
