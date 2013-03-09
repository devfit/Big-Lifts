@531
@premium
Feature: Boring But Big Movement Editor

  Scenario: Editing "Bench" defaults to "Bench"
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Bench" list item
    And I tap the "Bench" list item
    Then The "Lift" input is "Bench"

  Scenario: Adding a second big lift
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the "Add..." button
    And I toggle "Big Lift?"
    And I set select "lift" to "Press"
    And I tap the "Back" button
    Then List item 1 contains "Squat"
    Then List item 2 contains "Press"