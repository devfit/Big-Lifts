Feature: Rest Timer
  As a lifter
  I want to be time my rests between sets
  So that I can rest more efficiently

  Scenario: Viewing lifts while the timer is running does not stop the click
    When I view the squat lift schedule for week 1
    And I tap the rest timer button
    And I tap the increment rest timer button
    And I tap the increment rest timer button
    And I tap the increment rest timer button
    Then The rest timer shows "0:09"
    And I tap the rest timer start button
    And I wait 2 seconds
    And I tap back
    And I tap the rest timer button
    Then The rest timer does not show "0:09"
    Then The rest timer does not show "0:08"

  Scenario: The last used rest time is saved and used on the next lift
    When I view the squat lift schedule for week 1
    And I tap the rest timer button
    And I tap the increment rest timer button
    Then The rest timer shows "0:03"
    And I tap the increment rest timer button
    Then The rest timer shows "0:06"
    And I tap the rest timer start button
    And I wait 7 seconds
    Then I am on the lift template
    And I tap the rest timer button
    Then The rest timer shows "0:06"

  Scenario: Rest timer increment decrement
    When I view the squat lift schedule for week 1
    And I tap the rest timer button
    And I tap the increment rest timer button
    Then The rest timer shows "0:03"
    And I tap the rest timer start button
    And I wait 4 seconds
    Then I am on the lift template