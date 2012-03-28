Feature: adding lifts
  As a lifter
  I want to be able to see the plates that should be on the bar
  So that I don't have to calculate this manually

  Scenario: Default bar settings
    When I view the squat lift schedule for week 1
    And I tap set 1 in the lift template
    Then The plate breakdown for set 1 shows "[10,2.5]"
    And I tap set 2 in the lift template
    Then The plate breakdown for set 2 shows "[15,5,2.5]"
    And I tap set 3 in the lift template
    Then The plate breakdown for set 3 shows "[25,5,2.5]"
    And I tap set 4 in the lift template
    Then The plate breakdown for set 4 shows "[35]"
    And I tap set 5 in the lift template
    Then The plate breakdown for set 5 shows "[45]"
    And I tap set 6 in the lift template
    Then The plate breakdown for set 5 shows "[45,10]"

