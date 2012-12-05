@531
Feature: Manual lift template
  Scenario: Reverting to fresher after adding a set
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Custom" lift template
    And I tap the use template button
    And I tap the add set button
    And I set the manual percentage to 100
    And I set the manual reps to 1
    And I tap the "Back" button
    And I navigate back to the lift settings from the manual percentages editor
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 70 [warm] 40%,5 90 [warm] 50%,3 110 [warm] 60%,5 115 65%,5 135 75%,5 155 85%,1 180 100%"
    And I tap the "Back" button
    And I open the lift settings configuration
    And I select the "Fresher" lift template
    And I tap the use template button
    And I wait for the animation
    And I confirm the progression change
    And I wait for the animation
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 70 [warm] 40%,5 90 [warm] 50%,3 110 [warm] 60%,5 115 65%,5 135 75%,5 155 85%"
    Then Set 6 is marked as amrap

  Scenario: Marking a set warmup
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Custom" lift template
    And I tap the use template button
    And I select week 1 for the manual percentages editor
    And I select set 4 on the manual percentages editor
    And I check the warmup custom set checkbox
    And I tap the "Back" button
    And I navigate back to the lift settings from the manual percentages editor
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 1
    Then Set 4 is marked as warmup

  Scenario: Adding a set and marking it amrap
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Custom" lift template
    And I tap the use template button
    And I select week 1 for the manual percentages editor
    And I select set 5 on the manual percentages editor
    And I check the amrap custom set checkbox
    And I tap the "Back" button
    And I navigate back to the lift settings from the manual percentages editor
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 1
    Then Set 5 is marked as amrap

  Scenario: Add a set
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Custom" lift template
    And I tap the use template button
    And I select week 2 for the manual percentages editor
    And I tap the add set button
    And I set the manual percentage to 100
    And I set the manual reps to 1
    And I tap the "Back" button
    And I navigate back to the lift settings from the manual percentages editor
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 2
    Then The lift schedule shows "5 70 [warm] 40%,5 90 [warm] 50%,3 110 [warm] 60%,3 125 70%,3 145 80%,3 160 90%,1 180 100%"

  Scenario: Edit single percentage
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Custom" lift template
    And I tap the use template button
    And I select week 2 for the manual percentages editor
    Then Lift progressions in the list are visible
    And I select set 2 on the manual percentages editor
    And I set the manual percentage to 55
    And I tap the "Back" button
    And I navigate back to the lift settings from the manual percentages editor
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 2
    Then The set 2 lift percentage shows 55%

  Scenario: Edit single reps
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Custom" lift template
    And I tap the use template button
    And I select week 2 for the manual percentages editor
    And I select set 2 on the manual percentages editor
    And I set the manual reps to 7
    And I tap the "Back" button
    And I navigate back to the lift settings from the manual percentages editor
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 2
    Then The set 2 reps shows 7