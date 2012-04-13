Feature: adding lifts
  As a lifter
  I want to be able to calculate one-rep maxes based on known prior lifts
  So that I can create a reasonable lifting plan for Wendler 5/3/1

  Scenario Outline: Use estimated max for actual max
    When I open the 1-rep calculator
    And I set weight to <weight> and reps to <reps>
    And I select use for <lift>
    Then I am taken to the maxes page
    And The max for <lift> is set to <estimate>

  Scenarios: use one-rep calculations
    | weight | reps | lift     | estimate |
    | 200    | 10   | Press    | 266      |
    | 201    | 10   | Squat    | 267.5    |
    | 300    | 4    | Deadlift | 339.5    |

  Scenario Outline: calculate max with different values
    When I open the 1-rep calculator
    And I set weight to <weight> and reps to <reps>
    Then The calculated max should be <estimate>

  Scenarios: one-rep calculations
    | weight | reps | estimate |
    | 200    | 10   | 266      |
    | 201    | 10   | 267.5    |
    | 200    | 6    | 239.5    |
    | 300    | 1    | 310      |
    | 300    | 4    | 339.5    |



