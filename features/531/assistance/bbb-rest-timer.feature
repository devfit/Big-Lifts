@531
@premium
Feature: BBB Rest Timer

  Scenario: BBB Rest timer can be adjusted
    When I tap the assistance tab
    And I select "5x10" assistance work
    And I tap the "Squat" list item
    And I tap the rest timer button
    And I tap the "+1" button
    Then The rest timer shows "0:03"
    And I tap the "+1" button
    Then The rest timer shows "0:06"
    And I tap the "-1" button
    Then The rest timer shows "0:03"