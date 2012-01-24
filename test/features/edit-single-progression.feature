Feature: Editing single percentage
  As a lifter
  I want to be able to edit single percentages in the lift progression
  So that I can match the app to my gym's lifting program

  Scenario: Edit single percentage
    When I view the lift schedule
    And I open the lift settings configuration
    And I select edit manual percentages
    And I select week 2 for the manual percentages editor
    And I select set 2 on the manual percentages editor
    And I set the manual percentage to 55
    And I save the manual progression
    And I navigate back to the lift settings from the manual percentages editor
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 2
    Then The set 2 lift percentage shows 55%

  Scenario: Edit single reps
    When I view the lift schedule
    And I open the lift settings configuration
    And I select edit manual percentages
    And I select week 2 for the manual percentages editor
    And I select set 2 on the manual percentages editor
    And I set the manual reps to 7
    And I save the manual progression
    And I navigate back to the lift settings from the manual percentages editor
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 2
    Then The set 2 reps shows 7