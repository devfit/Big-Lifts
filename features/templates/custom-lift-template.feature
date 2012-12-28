@531
Feature: Custom lift template

  Scenario: Removing all sets and adding one
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Custom" lift template
    And I tap the use template button

    And I tap  6
    And I tap the delete button

    And I tap  5
    And I tap the delete button

    And I tap  4
    And I tap the delete button

    And I tap  3
    And I tap the delete button

    And I tap  2
    And I tap the delete button

    And I tap  1
    And I tap the delete button

    And I tap the "Add" button
    And I set the "Reps" input to "5"
    And I set the "Percentage" input to "90"
    And I tap the "Back" button
    Then There is a "90%"

  Scenario: Reverting to fresher after adding a set
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Custom" lift template
    And I tap the use template button
    And I tap the "Add" button
    And I set the "Percentage" input to "100"
    And I set the "Reps" input to "1"
    And I tap the "Back" button
    And I navigate back to the lift settings from the manual percentages editor
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 70 [warm] 40%,5 90 [warm] 50%,3 110 [warm] 60%,5 115 65%,5 135 75%,5 155 85%,1 180 100%"
    And I tap the "Back" button
    And I open the lift settings configuration
    And I select the "Fresher" lift template
    And I tap the use template button
    And I confirm the progression change
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
    And I tap  4
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
    And I tap  5
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
    And I tap the "Add" button
    And I set the "Percentage" input to "100"
    And I set the "Reps" input to "1"
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
    And I tap  2
    And I set the "Percentage" input to "55"
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
    And I tap  2
    And I set the "Reps" input to "7"
    And I tap the "Back" button
    And I navigate back to the lift settings from the manual percentages editor
    And I navigate back to the lift selector from lift settings
    And I view the squat lift schedule for week 2
    Then The set 2 reps shows 7