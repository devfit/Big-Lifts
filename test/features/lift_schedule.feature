Feature: lifter sets max
  As a lifter
  I want to set my lift maxes
  So that I can view the lift schedule by week based on my max

  Scenario Outline: set max and view lift
    When I set the <lift> max to <max>
    And I view the <lift> lift schedule for week <week>
    Then The lift schedule shows "<warmup1>","<warmup2>","<warmup3>","<work1>","<work2>","<work3>"

  Scenarios: squat
    | lift  | max | week | warmup1 | warmup2 | warmup3 | work1  | work2  | work3  |
    | squat | 300 | 1    | 5x 110  | 5x 135  | 3x 160  | 5x 175 | 5x 205 | 5x 230 |
    | squat | 300 | 2    | 5x 110  | 5x 135  | 3x 160  | 3x 190 | 3x 215 | 3x 245 |
    | squat | 300 | 3    | 5x 110  | 5x 135  | 3x 160  | 5x 205 | 3x 230 | 1x 255 |
    | squat | 300 | 4    | 5x 110  | 5x 135  | 3x 160  | 5x 160 | 5x 175 | 5x 190 |