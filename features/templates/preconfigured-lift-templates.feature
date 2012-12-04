@531
Feature: Lift templates

  Scenario: Heavier lift template
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Heavier" lift template
    And I tap the use template button
    And I confirm the progression change
    And I navigate back to the lift selector from lift settings
    And I set the squat max to 300
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 110 [warm] 40%","5 135 [warm] 50%","3 160 [warm] 60%","5 205 75%","5 215 80%","5 230 85%"
    And Set 6 is marked as amrap

  Scenario: Fresher lift template
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Fresher" lift template
    And I tap the use template button
    And I confirm the progression change
    And I navigate back to the lift selector from lift settings
    And I set the squat max to 300
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 110 [warm] 40%","5 135 [warm] 50%","3 160 [warm] 60%","5 175 65%","5 205 75%","5 230 85%"
    And Set 6 is marked as amrap