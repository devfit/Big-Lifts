Feature: Routines

  Scenario: Routines appear on the More tab
    When I select the "5/3/1" routine
    And I wait for the animation
    When I navigate to the "More" tab
    Then "5/3/1" is in the more info list