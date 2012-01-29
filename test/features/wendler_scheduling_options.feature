Feature: Selecting wendler options
  As a lifter
  I want to be able to select my wendler progression percentages option
  So that I can easily set the percentages for both programs

  Scenario: Select wendler progression option 2
    When I view the lift schedule
    And I open the lift settings configuration
    And I select wendler progression option 2
    And I confirm the wendler progression change
    And I navigate back to the lift selector from lift settings
    And I set the squat max to 300
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 110 40%","5 135 50%","3 160 60%","5 205 75%","5 215 80%","5 230 85%"

  Scenario: Select wendler progression option 1
    When I view the lift schedule
    And I open the lift settings configuration
    And I select wendler progression option 1
    And I confirm the wendler progression change
    And I navigate back to the lift selector from lift settings
    And I set the squat max to 300
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 110 40%","5 135 50%","3 160 60%","5 175 65%","5 205 75%","5 230 85%"