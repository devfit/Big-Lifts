Feature: Auto-increment lift maxes
  As a lifter
  I want to be able to auto-increment my maxes at the end of a cycle
  So that I don't have to up my maxes manually

  Scenario Outline: Check lifts by week
    When I set the <lift> max to <max>
    And I check off lifts for week 1
    And I check off lifts for week 2
    And I check off lifts for week 3
    And I check off lifts for week 4
    And I hit done on the lift completion screen
    Then <lift> max is set to <newmax>

  Scenarios: Check lifts by week
    | lift  | max | newmax |
    | squat | 200 | 210    |
    | press | 100 | 105    |

  Scenario: Fractional lift increase
    When I set the squat max to 200
    And I click edit lifts
    And I click edit "Squat"
    And I edit the cycle increase to be 2.5
    And I save and close the edit lift screen
    And I check off lifts for week 1
    And I check off lifts for week 2
    And I check off lifts for week 3
    And I check off lifts for week 4
    And I hit done on the lift completion screen
    Then squat max is set to 202.5