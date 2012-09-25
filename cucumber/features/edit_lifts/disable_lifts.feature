Feature: Disabling lifts

  Scenario: Disabled lifts do not appear in the lift schedule
    When I navigate to the lift editor
    And I click edit lifts
    And I disable "Squat"
    And I tap the "Done" button
    And I navigate to the lift schedule
    Then The lift selector shows "Deadlift,Press,Bench"