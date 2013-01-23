@531
@premium
Feature: Custom - Assistance Work

  Scenario: Viewing bodyweight lifts and viewing the log
    When I tap the assistance tab
    And I select "Bodyweight" assistance work
    And I tap the "Squat" list item
    Then The page title is "Bodyweight"
    Then List item 1 contains "One leg squat 5 sets 15x"
    Then List item 2 contains "Sit-ups 5 sets 15x"
    And I tap the "Save" button
    Then I am on the track tab
    And I tap the "Asst." button
    Then List item 1 contains "Bodyweight Sit-ups Sets: 5 15x"
    Then List item 2 contains "Bodyweight One leg squat Sets: 5 15x"

  Scenario: Changing bodyweight lift movements
    When I tap the assistance tab
    And I select "Bodyweight" assistance work
    And I tap the "Squat" list item
    Then List item 1 contains "One leg squat 5 sets 15x"
    And I tap assistance row 1
    And I change the custom movement name to "Good Morning"
    And I change the custom movement weight to 65
    And I tap the "Back" button
    Then List item 1 contains "Good Morning 5 sets 15x 65lbs"
    And I tap the "Save" button
    Then I am on the track tab
    And I tap the "Asst." button
    Then List item 1 contains "Bodyweight Sit-ups Sets: 5 15x"
    Then List item 2 contains "Bodyweight Good Morning Sets: 5 15x 65"
