@531
@premium
Feature: Graph

  Scenario: Lift selector is updated when lifts are added or removed
    When I tap the "Track" tab
    And I tap the graph button
    Then The "lifts" combobox contains "All,Squat,Press,Deadlift,Bench"

    And I tap the "Back" button
    And I tap the "Edit" tab
    When I add a new lift named "Clean" with max 200

    When I tap the "Track" tab
    And I tap the graph button
    Then The "lifts" combobox contains "All,Squat,Press,Deadlift,Bench,Clean"

  Scenario: Sorters are persisted after viewing the graph
    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I toggle "Asst."
    And I tap the "Save" button
    And I wait for the animation

    When I view the press lift schedule for week 2
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    And I tap the "Squat" list item
    And I change the log date to "01/14/2013"
    And I tap the "Back" button

    And I tap the "Press" list item
    And I change the log date to "02/14/2013"
    And I tap the "Back" button

    Then List item 1 contains "Press"

    And I tap the graph button
    And I tap the "Back" button

    Then List item 1 contains "Press"





