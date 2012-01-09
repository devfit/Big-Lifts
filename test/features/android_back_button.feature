Feature:
  As an android user
  I want to be able to use my back button to navigate the app
  So that all my apps navigate more consistently

  Scenario: Android user presses back at lift schedule
    When I navigate to the lift editor
    And I press the android back button
    Then I am still on the lift schedule