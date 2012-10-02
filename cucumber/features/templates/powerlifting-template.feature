Feature: Powerlifting template

  Scenario: Selecting the "Fresher" template hides the meet goals
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Powerlifting" lift template
    And I confirm the wendler progression change
    And I navigate back to the lift selector from lift settings
    And I open the lift settings configuration
    And I select the "Fresher" lift template
    And I confirm the wendler progression change
    And I navigate back to the lift selector from lift settings
    And I navigate to the lift editor
    Then Meet goals are not visible

  Scenario: Meet goals are visible and can be edited from the lifts tab
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Powerlifting" lift template
    And I confirm the wendler progression change
    And I navigate back to the lift selector from lift settings
    And I set the squat max to 300
    And I set the squat meet goal to 350
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 110 [warm] 40%,5 135 [warm] 50%,3 160 [warm] 60%,3 190 70%,3 215 80%,3 245 90%,1 300 85%,1 325 92.5%"
    And Set 6 is not marked as amrap

  Scenario: Goal maxes are used for the single sets, and goal maxes are default to the estimated one rep max
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Powerlifting" lift template
    And I confirm the wendler progression change
    And I navigate back to the lift selector from lift settings
    And I set the squat max to 300
    And I set the squat meet goal to 300
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 110 [warm] 40%,5 135 [warm] 50%,3 160 [warm] 60%,3 190 70%,3 215 80%,3 245 90%,1 255 85%,1 280 92.5%"
    And Set 6 is not marked as amrap

