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
    | squat | 300 | 1    | 5x 110 40% | 5x 135 50% | 3x 160 60% | 5x 175 65% | 5x 205 75% | 5+ 230 85% |
    | squat | 300 | 2    | 5x 110 40% | 5x 135 50% | 3x 160 60% | 3x 190 70% | 3x 215 80% | 3+ 245 90% |
    | squat | 300 | 3    | 5x 110 40% | 5x 135 50% | 3x 160 60% | 5x 205 75% | 3x 230 85% | 1+ 255 95% |
    | squat | 300 | 4    | 5x 110 40% | 5x 135 50% | 3x 160 60% | 5x 110 40% | 5x 135 50% | 5+ 160 60% |
    | press | 125 | 3    | 5x 45 40%  | 5x 55 50%  | 3x 70 60%  | 5x 85 75%  | 3x 95 85%  | 1+ 105 95% |

