@531
@premium
Feature: Assistance Work
  Scenario: "None" assistance work isn't shown in the log
    When I tap the assistance tab
    And I select "None" assistance work
    And I tap "Asst." to change the log type
    Then There are no assistance log entries

  Scenario: Remembering the last assistance selection between workouts
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    When I tap the assistance tab
    And I select "None" assistance work
    And I tap the assistance tab
    Then "None" assistance work is selected