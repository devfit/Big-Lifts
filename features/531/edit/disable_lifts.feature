@531
Feature: Disabling lifts
  Scenario: Completing a cycle with lifts disabled
    tuh do

  Scenario: When a lift is disabled, completing enabled lifts triggers the cycle increase, and only enabled lifts are shown
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I disable "Squat"
    And I disable "Deadlift"
    And I disable "Press"
    And I tap the "Done" button
    When I view the bench lift schedule for week 1
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation
    When I view the bench lift schedule for week 2
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation
    When I view the bench lift schedule for week 3
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation
    When I view the bench lift schedule for week 4
    When I tap the checkmark
    And I tap the "Save" button
    Then I am prompted with the cycle complete dialog
    And I tap the question mark button
    Then The help screen shows lifts "Bench"
    And I tap the "Back" button


  Scenario: When a lift is disabled, selecting a lift selects the displayed lift, and not the index of the disabled lift
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I disable "Squat"
    And I tap the "Done" button
    And I navigate to the lift schedule
    When I view the deadlift lift schedule for week 1
    Then The lift template title is "Deadlift"

  Scenario: Weeks can be checked with lifts disabled
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I disable "Squat"
    And I disable "Deadlift"
    And I disable "Press"
    And I tap the "Done" button
    And I navigate to the lift schedule
    When I view the bench lift schedule for week 1
    When I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation
    And I navigate to the lift schedule
    Then Week 1 of the lift selector is marked complete

  Scenario: Disabled lifts do not appear in the lift schedule
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I disable "Squat"
    And I tap the "Done" button
    And I navigate to the lift schedule
    Then The lift selector shows "Press,Deadlift,Bench"

  Scenario: Checking a disable lift checkbox does not cause it to disappear
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I disable "Squat"
    Then The "Squat" edit lift row still has a checkbox