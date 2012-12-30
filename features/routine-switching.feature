Feature: Switching routines

  @StartingStrength
  Scenario: Switching out and back in to Starting Strength
    When I navigate to the "More" tab
    And I tap the "Routine" list item
    Then I am on the routine chooser
    And I tap the "Starting Strength" list item
    And I wait for the animation
    Then There is a "More" tab
    Then There is a "Lift!" tab
    Then There is a "Edit" tab
    Then There is a "Track" tab

  @531
  Scenario: Switching out and back in to 5/3/1
    When I navigate to the "More" tab
    And I tap the "Routine" list item
    Then I am on the routine chooser
    And I tap the "5/3/1" list item
    And I wait for the animation
    Then There is a "Lift!" tab
    Then There is a "Edit" tab
    Then There is a "Track" tab
    Then There is a "1-Rep" tab
    Then There is a "More" tab