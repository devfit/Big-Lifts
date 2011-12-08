Feature: adding lifts
  As a lifter
  I want to be able to add new lifts
  So that I can view lift schedules for more than the built in options

  Scenario: add a new lift
    When I add a new lift named "Clean and Jerk" with max 200
    And When I close the edit lifts screen
    Then "Clean and Jerk" is added to the edit lifts screen
    And "Clean and Jerk" is added to the lift schedule

  Scenario: add a new lift with an invalid name
    When I add a new lift named "222" with max 300
    Then I see an error with message "Invalid lift name"
    And I close the add lift screen
    And "222" is not added to the edit lifts screen