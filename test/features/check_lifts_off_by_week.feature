Feature: Checking off lifts by week
  As a lifter
  I want to be able to check off lifts by week
  So that I can track my progress through a Wendler cycle

  Scenario: Check lifts by week
    When I check off lifts for week 1
    Then the disclosure icons for week 1 are checkmarks

  Scenario: Check and uncheck lifts by week
    When I check off lifts for week 1
    And I uncheck lifts for week 1
    Then the disclosure icons for week 1 are not checkmarks
