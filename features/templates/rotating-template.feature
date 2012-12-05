@531
Feature: Rotating lift template
  Scenario: Deload lifts are not blank
    And I set the squat max to 300
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Rotating" lift template
    And I tap the use template button
    And I confirm the progression change
    And I wait for the animation
    And I navigate back to the lift selector from lift settings
    When I view the squat lift schedule for week 1
    Then The lift schedule shows "5 110 [warm] 40%","5 110 [warm] 40%","5 110 [warm] 40%","5 110 40%","5 135 50%","5 160 60%"

  Scenario: Week 4 lifts are not blank
    And I set the bench max to 300
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Rotating" lift template
    And I tap the "Rotate" button
    And I tap the use template button
    And I confirm the progression change
    And I wait for the animation
    And I navigate back to the lift selector from lift settings
    When I view the bench lift schedule for week 4
    Then The lift schedule shows "5 110 [warm] 40%","5 135 [warm] 50%","3 160 [warm] 60%","5 205 75%","3 230 85%","1 255 95%"

  Scenario: Switching away from the rotations template remove the week rotation
    And I set the deadlift max to 300
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Rotating" lift template
    And I tap the "Rotate" button
    And I tap the use template button
    And I confirm the progression change
    And I wait for the animation
    And I navigate back to the lift selector from lift settings
    And I open the lift settings configuration
    And I select the "Fresher" lift template
    And I tap the use template button
    And I confirm the progression change
    And I wait for the animation
    And I navigate back to the lift selector from lift settings
    And I view the deadlift lift schedule for week 3
    Then The lift schedule shows "5 110 [warm] 40%","5 135 [warm] 50%","3 160 [warm] 60%","5 205 75%","3 230 85%","1 255 95%"

  Scenario: Default rotation
    When I set the press max to 200
    And I set the deadlift max to 300
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Rotating" lift template
    And I tap the use template button
    And I confirm the progression change
    And I wait for the animation
    And I navigate back to the lift selector from lift settings
    And I view the press lift schedule for week 1
    Then The lift schedule shows "5 70 [warm] 40%","5 90 [warm] 50%","3 110 [warm] 60%","5 115 65%","5 135 75%","5 155 85%"
    And I tap the "Back" button
    And I view the deadlift lift schedule for week 1
    Then The lift schedule shows "5 110 [warm] 40%","5 135 [warm] 50%","3 160 [warm] 60%","3 190 70%","3 215 80%","3 245 90%"

  Scenario: Rotating the rotations
    And I set the deadlift max to 300
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Rotating" lift template
    And I tap the "Rotate" button
    And I tap the use template button
    And I confirm the progression change
    And I wait for the animation
    And I navigate back to the lift selector from lift settings
    And I view the deadlift lift schedule for week 1
    Then The lift schedule shows "5 110 [warm] 40%","5 135 [warm] 50%","3 160 [warm] 60%","5 205 75%","3 230 85%","1 255 95%"


