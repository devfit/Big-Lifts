@531
@premium
Feature: Custom - Assistance Work

  Scenario: Adding custom lift movements
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    And I select "Custom" assistance work
    And I tap the "Add..." button
    And I change the custom movement name to "Good Morning"
    And I change the custom movement weight to 65
    And I tap the "Back" button
    Then Assistance movement 3 is "Good Morning 5 sets 15x 65lbs"
    And I tap the "Save" button
    Then I am on the track tab
    And I tap "Asst." to change the log type
    Then Assistance log entry 1 shows "Custom Good Morning Sets: 5 15x 65"

  Scenario: Custom lifts can be removed
    When I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    And I select "Custom" assistance work
    And I tap assistance row 1
    And I tap the trash button
    Then There is 1 custom assistance row

  Scenario: Viewing Custom lifts for non-default lifts
    When I add a new lift named "Clean" with max 200
    And I view the clean lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    And I select "Custom" assistance work
    Then Assistance movement 1 is "? 5 sets 15x [?]lbs"
    Then Assistance movement 2 is "? 5 sets 15x [?]lbs"
    And I tap assistance row 1
    And I change the custom movement name to "Move1"
    And I tap the "Back" button
    And I tap assistance row 2
    And I change the custom movement name to "Move2"
    And I tap the "Back" button
    And I tap the "Save" button
    Then I am on the track tab
    And I tap "Asst." to change the log type
    Then Assistance log entry 1 shows "Move2 Sets: 5 15x [?]"
    Then Assistance log entry 2 shows "Move1 Sets: 5 15x [?]"

  Scenario: Viewing Custom lifts and viewing the log
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    And I select "Custom" assistance work
    Then Assistance movement 1 is "Leg Press 5 sets 15x [?]lbs"
    Then Assistance movement 2 is "Leg Curl 5 sets 15x [?]lbs"
    And I tap the "Save" button
    Then I am on the track tab
    And I tap "Asst." to change the log type
    Then Assistance log entry 1 shows "Custom Leg Curl Sets: 5 15x [?]"
    Then Assistance log entry 2 shows "Custom Leg Press Sets: 5 15x [?]"

  Scenario: Changing custom lift movements
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I tap the "Save" button
    And I select "Custom" assistance work
    Then Assistance movement 1 is "Leg Press 5 sets 15x [?]lbs"
    And I tap assistance row 1
    And I change the custom movement name to "Good Morning"
    And I change the custom movement weight to 65
    And I tap the "Back" button
    Then Assistance movement 1 is "Good Morning 5 sets 15x 65lbs"
    And I tap the "Save" button
    Then I am on the track tab
    And I tap "Asst." to change the log type
    Then Assistance log entry 1 shows "Custom Leg Curl Sets: 5 15x [?]"
    Then Assistance log entry 2 shows "Custom Good Morning Sets: 5 15x 65"
