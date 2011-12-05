Feature: lifter sets max
  As a lifter
  I want to set my lift maxes
  So that I can view the lift schedule by week based on my max

#  Scenario Outline: set max and ivew lift
#    Scenarios: squat week 1
#    |lift|max|

  Scenario: Squat lifts week 1
    When I set the squat max to 300
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5x 110","5x 135","3x 160","5x 175","5x 205","5x 230"

  Scenario: Squat lifts week 2
    When I set the squat max to 300
    And I view the squat lift schedule for week 2
    Then The lift schedule shows "5x 110","5x 135","3x 160","3x 190","3x 215","3x 245"
