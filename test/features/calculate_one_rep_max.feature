Feature: adding lifts
  As a lifter
  I want to be able to calculate one-rep maxes based on known prior lifts
  So that I can create a reasonable lifting plan for Wendler 5/3/1

  Scenario Outline: calculate max with different values
    When I open the 1-rep calculator
    And I set weight to <weight> and reps to <reps>
    Then Then The calculated max should be <estimate>

  Scenarios: one-rep calculations
    | weight | reps | estimate |
    | 200    | 10   | 266      |
    | 201    | 10   | 267      |
    | 200    | 6    | 240      |
    | 300    | 1    | 310      |
    | 300    | 4    | 340      |

#  Scenario: add a new lift with an invalid name
#    When I add a new lift named "222" with max 300
#    Then I see an error with message "Invalid lift name"
#    And I close the add lift screen
#    And "222" is not added to the edit lifts screen
