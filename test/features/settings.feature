Feature: Settings

  Scenario: Untoggle the training max
    When I set the squat max to 300
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 110 40%","5 135 50%","3 160 60%","5 175 65%","5 205 75%","5 230 85%"
    And I return to the lift schedule
    And I navigate to the settings page
    And I untoggle use training max
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 120 40%","5 150 50%","3 180 60%","5 195 65%","5 225 75%","5 255 85%"

  Scenario: Change training percentage
    When I set the squat max to 300
    And I navigate to the settings page
    And I set the training percentage to 95
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5 115 40%","5 145 50%","3 170 60%","5 185 65%","5 215 75%","5 240 85%"
    And I navigate to the lift editor
    Then The training percentage shows 95
    Then The calculated squat training max is 285

