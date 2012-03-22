Feature: lifter sets max
  As a lifter
  I want to set my lift maxes
  So that I can view the lift schedule by week based on my max

  Scenario Outline: set max and view lift
    When I set the <lift> max to <max>
    And I view the <lift> lift schedule for week <week>
    Then The lift schedule shows "<warmup1>","<warmup2>","<warmup3>","<work1>","<work2>","<work3>"

  Scenarios: different lifts
    | lift  | max | week | warmup1 | warmup2 | warmup3 | work1  | work2  | work3  |
    | squat | 300 | 1    | 5 110 [warm] 40% | 5 135 [warm] 50% | 3 160 [warm] 60% | 5 175 65% | 5 205 75% | 5 230 85% |
    | squat | 300 | 2    | 5 110 [warm] 40% | 5 135 [warm] 50% | 3 160 [warm] 60% | 3 190 70% | 3 215 80% | 3 245 90% |
    | squat | 300 | 3    | 5 110 [warm] 40% | 5 135 [warm] 50% | 3 160 [warm] 60% | 5 205 75% | 3 230 85% | 1 255 95% |
    | squat | 300 | 4    | 5 110 [warm] 40% | 5 110 [warm] 40% | 5 110 [warm] 40% | 5 110 40% | 5 135 50% | 5 160 60% |
    | press | 125 | 3    | 5 45 [warm] 40%  | 5 55 [warm] 50%  | 3 70 [warm] 60%  | 5 85 75%  | 3 95 85%  | 1 105 95% |

