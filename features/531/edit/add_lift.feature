@531
Feature: adding lifts

  Scenario: newly added lift can be edited
    When I add a new lift named "TestLift" with max 100
    And I tap the "Edit" button
    And I tap the "TestLift" list item
    And I edit the name to be "TestLift2"
    And I tap the "Back" button
    Then "TestLift2" is added to the edit lifts screen
    And "TestLift2" is added to the lift schedule


  Scenario: add a new lift
    When I add a new lift named "Clean and Jerk" with max 200
    Then "Clean and Jerk" is added to the edit lifts screen
    And "Clean and Jerk" is added to the lift schedule
    And The sort ordering is sensible

  Scenario: add a new lift with an invalid name
    When I add a new lift named "" with max 300
    Then I see an error with message "Invalid lift name"
    And I tap the "Cancel" button
    Then "222" is not added to the edit lifts screen