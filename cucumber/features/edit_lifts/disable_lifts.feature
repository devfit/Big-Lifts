Feature: Disabling lifts
  Scenario: When a lift is disabled, selecting a lift selects the displayed lift, and not the index of the disabled lift
    When I navigate to the lift editor
    And I click edit lifts
    And I disable "Squat"
    And I tap the "Done" button
    And I navigate to the lift schedule
    When I view the deadlift lift schedule for week 1
    Then The lift template title is "Deadlift"

  Scenario: Weeks can be checked with lifts disabled
    When I navigate to the lift editor
    And I click edit lifts
    And I disable "Squat"
    And I disable "Deadlift"
    And I disable "Press"
    And I tap the "Done" button
    And I navigate to the lift schedule
    When I view the bench lift schedule for week 1
    When I mark the current lift completed
    And I save the lift log
    And I navigate to the lift schedule
    Then Week 1 of the lift selector is marked complete

  Scenario: Disabled lifts do not appear in the lift schedule
    When I navigate to the lift editor
    And I click edit lifts
    And I disable "Squat"
    And I tap the "Done" button
    And I navigate to the lift schedule
    Then The lift selector shows "Deadlift,Press,Bench"

  Scenario: Checking a disable lift checkbox does not cause it to disappear
    When I navigate to the lift editor
    And I click edit lifts
    And I disable "Squat"
    Then The "Squat" edit lift row still has a checkbox