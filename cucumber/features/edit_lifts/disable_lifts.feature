Feature: Disabling lifts

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