Feature: Checking off individual lifts
  As a lifter
  I want to be able to check off an individual lift
  So that I can track my progress through a Wendler cycle

  Scenario: Check lift indicator is set before each lfit is viewed
    When I view the squat lift schedule for week 1
    When I mark the current lift completed
    And I return to the lift schedule
    When I view the bench lift schedule for week 1
    Then The lift complete button is unchecked
