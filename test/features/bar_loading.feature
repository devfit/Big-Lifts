Feature: adding lifts
  As a lifter
  I want to be able to see the plates that should be on the bar
  So that I don't have to calculate this manually

  Scenario: 35lb bar
    When I navigate to the lift editor
    And I tap the bar/plates button
    And I set the bar weight to 35
    And I tap back in the bar plates editor
    And I view the squat lift schedule for week 1
    And I tap set 1 in the lift template
    Then The plate breakdown for the current set shows "[15,2.5]"
    And I tap set 2 in the lift template
    Then The plate breakdown for the current set shows "[25,2.5]"
    And I tap set 3 in the lift template
    Then The plate breakdown for the current set shows "[35,2.5]"
    And I tap set 4 in the lift template
    Then The plate breakdown for the current set shows "[35,5]"
    And I tap set 5 in the lift template
    Then The plate breakdown for the current set shows "[45,5]"
    And I tap set 6 in the lift template
    Then The plate breakdown for the current set shows "[45,15]"

  Scenario: Default bar settings
    When I view the squat lift schedule for week 1
    And I tap set 1 in the lift template
    Then The plate breakdown for the current set shows "[10,2.5]"
    And I tap set 2 in the lift template
    Then The plate breakdown for the current set shows "[15,5,2.5]"
    And I tap set 3 in the lift template
    Then The plate breakdown for the current set shows "[25,5,2.5]"
    And I tap set 4 in the lift template
    Then The plate breakdown for the current set shows "[35]"
    And I tap set 5 in the lift template
    Then The plate breakdown for the current set shows "[45]"
    And I tap set 6 in the lift template
    Then The plate breakdown for the current set shows "[45,10]"
