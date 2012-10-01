Feature: Powerlifting template

  Scenario: Goal maxes are used for the single sets, and goal maxes are default to the estimated one rep max
    When I view the lift schedule
    And I open the lift settings configuration
    And I select the "Powerlifting" lift template
    And I confirm the wendler progression change
    And I navigate back to the lift selector from lift settings
    And I set the squat max to 300
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 110 [warm] 40%,5 135 [warm] 50%,3 160 [warm] 60%,3 190 70%,3 215 80%,3 255 85%,1 280 92.5%"
    And Set 6 is not marked as amrap