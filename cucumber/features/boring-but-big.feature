@premium
Feature: Boring But Big - Assistance Work
  As a lifter
  I want to be able to get and track BBB work
  So that I can integrate my assistance work into my app programming

  Scenario: Viewing BBB lifts, Changing the percentage, and viewing the log
    When I set the squat max to 200
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select "Boring But Big" assistance work
    Then The first boring but big lift weight is 90
    And I set the BBB percentage to 60
    Then The first boring but big lift weight is 110
    And I save the boring but big assistance work
    And I tap edit boring but big notes
    And I set the boring but big notes to "Felt okay. A little slow on the last set"
    And I return from the boring but big notes
    And I save the boring but big log
    Then I am on the track tab
    And I tap "Asst." to change the log type
    Then I see 1 assistance log entry for "10x110"
    And I tap BBB log entry 1
    Then The assistance details notes shows "Felt okay. A little slow on the last set"