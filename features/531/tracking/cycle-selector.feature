@531
Feature: Filtering log by cycle

  @premium
  Scenario: Filtering assistance entries
    When I tap the assistance tab
    And I select "Bodyweight" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button

    When I navigate to the lift schedule
    And I tap the "Cycle 1" button
    And I tap the "Done" button

    And I tap the assistance tab
    And I select "Bodyweight" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button

    And I tap the "Asst." button
    Then There are 4 log entries
    And I set the log cycle filter to "1"
    Then There are 2 log entries

  Scenario: Filtering lift entries
    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    When I navigate to the lift schedule
    And I tap the "Cycle 1" button
    And I tap the "Done" button
    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation

    Then There are 2 log entries
    And I set the log cycle filter to "1"
    Then There are 1 log entries