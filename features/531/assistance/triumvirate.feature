@531
@premium
Feature: Custom - Assistance Work

  Scenario: Viewing Custom lifts for non-default lifts
    When I add a new lift named "Clean" with max 200
    When I tap the assistance tab
    And I select "Custom" assistance work
    And I tap the "Clean" list item
    Then List item 1 contains "? 5 sets 15x"
    Then List item 2 contains "? 5 sets 15x"
    And I tap assistance row 1
    And I change the custom movement name to "Move1"
    And I tap the "Back" button
    And I tap assistance row 2
    And I change the custom movement name to "Move2"
    And I tap the "Back" button
    And I tap the "Save" button
    Then I am on the track tab
    And I tap the "Asst." button
    Then List item 1 contains "Move2 Sets: 5 15x"
    Then List item 2 shows "Move1 Sets: 5 15x"

  Scenario: Adding custom lift movements
    When I tap the assistance tab
    And I select "Custom" assistance work
    And I tap the "Squat" list item
    And I tap the "Add..." button
    And I change the custom movement name to "Good Morning"
    And I change the custom movement weight to 65
    And I tap the "Back" button
    Then List item 3 contains "Good Morning 5 sets 15x 65lbs"
    And I tap the "Save" button
    Then I am on the track tab
    And I tap the "Asst." button
    Then List item 1 contains "Custom Good Morning Sets: 5 15x 65"

  Scenario: Custom lifts can be removed
    When I tap the assistance tab
    And I select "Custom" assistance work
    And I tap the "Squat" list item
    And I tap assistance row 1
    And I tap the trash button
    Then There are 1 list items

  Scenario: Viewing Custom lifts and viewing the log
    When I tap the assistance tab
    And I select "Custom" assistance work
    And I tap the "Squat" list item
    Then List item 1 contains "Leg Press 5 sets 15x"
    Then List item 2 contains "Leg Curl 5 sets 15x"
    And I tap the "Save" button
    Then I am on the track tab
    And I tap the "Asst." button
    Then List item 1 contains "Custom Leg Curl Sets: 5 15x"
    Then List item 2 contains "Custom Leg Press Sets: 5 15x"

  Scenario: Changing custom lift movements
    When I tap the assistance tab
    And I select "Custom" assistance work
    And I tap the "Squat" list item
    Then List item 1 contains "Leg Press 5 sets 15x"
    And I tap assistance row 1
    And I change the custom movement name to "Good Morning"
    And I change the custom movement weight to 65
    And I tap the "Back" button
    Then List item 1 contains "Good Morning 5 sets 15x 65lbs"
    And I tap the "Save" button
    Then I am on the track tab
    And I tap the "Asst." button
    Then List item 1 contains "Custom Leg Curl Sets: 5 15x"
    Then List item 2 contains "Custom Good Morning Sets: 5 15x 65"