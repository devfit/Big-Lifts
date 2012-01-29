Feature: Checking off individual lifts
  As a lifter
  I want to be able to check off an individual lift
  So that I can track my progress through a Wendler cycle

  Scenario: Check lift indicator is set before each lift is viewed
    When I view the squat lift schedule for week 1
    When I mark the current lift completed
    And I save the lift log
    And I navigate to the lift schedule
    Then the Squat lift is checked
