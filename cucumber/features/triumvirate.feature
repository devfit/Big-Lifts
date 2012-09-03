@premium
Feature: Triumvirate - Assistance Work
  As a lifter
  I want to be able to get and track triumvirate assistance

  Scenario: Viewing Triumvirate lifts and viewing the log
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select "Triumvirate" assistance work
    Then Triumvirate movement 1 is "Leg Press 5 sets 15x [?]lbs"
    Then Triumvirate movement 2 is "Leg Curl 5 sets 15x [?]lbs"
    And I save the triumvirate assistance work
    Then I am on the track tab
    And I tap "Asst." to change the log type
    Then Assistance log entry 1 shows "Triumvirate Leg Press Sets: 5 15x [?]"
    Then Assistance log entry 2 shows "Triumvirate Leg Curl Sets: 5 15x [?]"
