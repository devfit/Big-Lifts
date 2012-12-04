@531
Feature: Viewing a lift schedule
  Scenario: Viewing two lifts in one session
    When I set the squat max to 300
    And I set the press max to 100
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 110 [warm] 40%","5 135 [warm] 50%","3 160 [warm] 60%","5 175 65%","5 205 75%","5 230 85%"
    And I back out of viewing the lift
    And I view the press lift schedule for week 1
    Then The lift schedule shows "5 35 [warm] 40%","5 45 [warm] 50%","3 55 [warm] 60%","5 60 65%","5 70 75%","5 75 85%"

  Scenario Outline: set max and view lift
    When I set the <lift> max to <max>
    And I view the <lift> lift schedule for week <week>
    Then The lift schedule shows "<warmup1>","<warmup2>","<warmup3>","<work1>","<work2>","<work3>"

  Scenarios: different lifts
    | lift  | max | week | warmup1          | warmup2          | warmup3          | work1     | work2     | work3     |
    | squat | 300 | 1    | 5 110 [warm] 40% | 5 135 [warm] 50% | 3 160 [warm] 60% | 5 175 65% | 5 205 75% | 5 230 85% |
    | squat | 300 | 2    | 5 110 [warm] 40% | 5 135 [warm] 50% | 3 160 [warm] 60% | 3 190 70% | 3 215 80% | 3 245 90% |
    | squat | 300 | 3    | 5 110 [warm] 40% | 5 135 [warm] 50% | 3 160 [warm] 60% | 5 205 75% | 3 230 85% | 1 255 95% |
    | squat | 300 | 4    | 5 110 [warm] 40% | 5 110 [warm] 40% | 5 110 [warm] 40% | 5 110 40% | 5 135 50% | 5 160 60% |
    | press | 125 | 3    | 5 45 [warm] 40%  | 5 55 [warm] 50%  | 3 70 [warm] 60%  | 5 85 75%  | 3 95 85%  | 1 105 95% |

