@531
Feature: Auto-increment lift maxes

  Scenario: Check lifts by week
    When I set the squat max to 200
    When I set the press max to 100
    And I navigate to the lift schedule
    And I check off all lifts but bench week 4
    And I view the bench lift schedule for week 4
    And I tap the checkmark
    And I tap the "Save" button
    And I tap the "Done" button
    Then squat max is set to 210
    Then press max is set to 105

  Scenario: Fractional lift increase
    When I set the squat max to 200
    And I tap the "Edit" button
    And I tap the "Squat" list item
    And I edit the cycle increase to be 2.5
    And I tap the "Back" button
    And I navigate to the lift schedule
    And I check off all lifts but bench week 4
    And I view the bench lift schedule for week 4
    And I tap the checkmark
    And I tap the "Save" button
    And I tap the "Done" button
    Then squat max is set to 202.5