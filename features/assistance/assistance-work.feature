@531
@premium
Feature: Assistance Work
  Scenario: Navigating back from the lift chooser
    When I tap the assistance tab
    And I select "Bodyweight" assistance work
    And I tap the "Back" button
    Then I am on the assistance chooser

  Scenario: "None" assistance work isn't shown in the log
    When I tap the assistance tab
    And I select "None" assistance work
    And I tap the "Asst." button
    Then There are 0 list entries

  Scenario: Remembering the last assistance selection between workouts
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    And I wait for the animation
    When I tap the assistance tab
    And I select "None" assistance work
    And I tap the assistance tab
    Then "None" assistance work is selected