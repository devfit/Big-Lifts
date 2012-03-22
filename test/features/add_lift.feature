Feature: adding lifts
  As a lifter
  I want to be able to add new lifts
  So that I can view lift schedules for more than the built in options

  Scenario: add a new lift
    When I add a new lift named "Clean and Jerk" with max 200
    Then "Clean and Jerk" is added to the edit lifts screen
    And "Clean and Jerk" is added to the lift schedule
    And The sort ordering is sensible

  Scenario: add a new lift with an invalid name
    When I add a new lift named "222" with max 300
    Then I see an error with message "Invalid lift name"
    And I close the add lift screen
    Then "222" is not added to the edit lifts screen

  Scenario: newly added lift can be edited
    When I add a new lift named "TestLift" with max 100
    And I click edit lifts
    And I click edit "TestLift"
    And I edit the name to be "TestLift2"
    And I close the edit lift screen
    Then "TestLift2" is added to the edit lifts screen
    And "TestLift2" is added to the lift schedule
