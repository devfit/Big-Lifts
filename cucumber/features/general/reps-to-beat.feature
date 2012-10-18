Feature: Reps to beat
  As a lifter
  I want to be able to see the reps to beat whne viewing the lift schedule
  To know how many reps to aim for

  Scenario: Showing the reps to beat
    When I set the squat max to 200
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I set the first log reps to 7
    And I tap the "Save" button
    And I view the squat lift schedule for week 2
    And I mark the current lift completed
    And I set the first log reps to 4
    And I tap the "Save" button
    And I view the squat lift schedule for week 3
    Then The best estimated one rep max is 191
    And The reps to beat is 4