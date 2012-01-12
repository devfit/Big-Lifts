Feature: Settings

  Scenario: Untoggle the training max
    When I set the squat max to 300
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5x 110 40%","5x 135 50%","3x 160 60%","5x 175 65%","5x 205 75%","5x 230 85%"
    And I return to the lift schedule
    And I navigate to the settings page
    And I untoggle use training max
    And I view the squat lift schedule for week 1
    Then The lift schedule shows "5x 120 40%","5x 150 50%","3x 180 60%","5x 195 65%","5x 225 75%","5x 255 85%"

