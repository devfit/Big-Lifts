Feature: Rest Timer
  As a lifter
  I want to be time my rests between sets
  So that I can rest more efficiently

  Scenario: Rest Timer increment decrement
    When I view the squat lift schedule for week 1
    And I tap the rest timer button
    And I tap the increment rest timer button
    Then The rest timer shows "0:03"
    And I tap the rest timer start button
    And I wait 4 seconds
    Then I am on the lift template