Feature: Routines

  Scenario: Routines appear on the More tab
    When I select the "5/3/1" routine
    And I navigate to the more tab
    Then "5/3/1" is in the more info list