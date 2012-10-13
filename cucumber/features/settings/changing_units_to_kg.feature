Feature: Adjusting the weights to kg

  @premium
  Scenario: Plates are adjusted when kg is selected
    When I navigate to the settings page
    And I set units to kg
    And I navigate to the lift editor
    And I tap the bar/plates button
    Then The plates list shows "25kg,20kg,10kg,5kg,2.5kg,1.25kg"
    The Bar weight shows

  Scenario: Maxes are cut in half for kg settings
    When I set the squat max to 300
    When I set the deadlift max to 300
    When I set the press max to 100
    When I set the bench max to 100

    When I navigate to the settings page
    And I set units to kg

    When I navigate to the lift schedule
    And I click the increase cycle button
    And I tap the "Done" button
    Then The max for Squat is set to 305
    Then The max for Deadlift is set to 305
    Then The max for Press is set to 102.5
    Then The max for Bench is set to 102.5