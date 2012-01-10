Feature:
  As an android user
  I want to be able to use my back button to navigate the app
  So that all my apps navigate more consistently

  Scenario: Android user presses back at lift schedule
    When I navigate to the lift schedule
    And I press the android back button
    Then I am on the lift schedule

  Scenario: Android user presses back when viewing a week and lift
    When I view the squat lift schedule for week 1
    And I press the android back button
    Then I am on the lift schedule

  Scenario: Android user presses back when viewing lift settings
    When I navigate to the lift schedule
    And I open the lift settings configuration
    And I press the android back button
    Then I am on the lift schedule

  Scenario: Android user presses back when viewing manual lift percentages
    When I navigate to the lift schedule
    And I open the lift settings configuration
    And I select edit manual percentages
    And I press the android back button
    Then I am on the lift settings

  Scenario: Android user presses back when adding a lift
    When I navigate to the lift editor
    And I click add lift
    And I press the android back button
    Then I am on the lift editor