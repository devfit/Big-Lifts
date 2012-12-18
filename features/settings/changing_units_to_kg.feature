@531
Feature: Adjusting the weights to kg

  @premium
  Scenario: Plates are adjusted when kg is selected
    When I navigate to the settings page
    And I set select "units" to "kg"
    And I navigate to the lift editor
    And I tap the "Bar/Plates" button
    Then The plates list shows "25kg,20kg,10kg,5kg,2.5kg,1.25kg"
    Then The bar weight is 20.4

  Scenario: Maxes are cut in half for kg settings
    When I set the squat max to 300
    When I set the deadlift max to 300
    When I set the press max to 100
    When I set the bench max to 100

    When I navigate to the settings page
    And I set select "units" to "kg"

    When I navigate to the lift schedule
    And I click the increase cycle button
    And I tap the "Done" button

    And I navigate to the lift editor
    Then The "Squat" input is "305"
    Then The "Deadlift" input is "305"
    Then The "Press" input is "102.5"
    Then The "Bench" input is "102.5"