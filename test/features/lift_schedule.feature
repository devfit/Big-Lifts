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
    | squat | 300 | 1    | 5x 110\n40% | 5x 135\n50% | 3x 160\n60% | 5x 175\n65% | 5x 205\n75% | 5x 230\n85% |
    | squat | 300 | 2    | 5x 110\n40% | 5x 135\n50% | 3x 160\n60% | 3x 190\n70% | 3x 215\n80% | 3x 245\n90% |
    | squat | 300 | 3    | 5x 110\n40% | 5x 135\n50% | 3x 160\n60% | 5x 205\n75% | 3x 230\n85% | 1x 255\n95% |
    | squat | 300 | 4    | 5x 110\n40% | 5x 135\n50% | 3x 160\n60% | 5x 160\n60% | 5x 175\n65% | 5x 190\n70% |
    | press | 125 | 3    | 5x 45\n40%  | 5x 55\n50%  | 3x 70\n60%  | 5x 85\n75%  | 3x 95\n85%  | 1x 105\n95% |

