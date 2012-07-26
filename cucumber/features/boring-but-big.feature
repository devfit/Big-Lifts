@premium
Feature: Boring But Big - Assistance Work
  As a lifter
  I want to be able to get and track BBB work
  So that I can integrate my assistance work into my app programming

  Scenario: Viewing BBB lifts
    When I set the squat max to 200
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select "Boring But Big" assistance work
    Then The first boring but big lift weight is 90

  Scenario: Changing BBB percentage number
    When I set the squat max to 200
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select "Boring But Big" assistance work
    And I set the BBB percentage to 60
    Then The first boring but big lift weight is 110

  Scenario: Logging BBB work
    When I set the squat max to 200
    And I view the squat lift schedule for week 1
    And I mark the current lift completed
    And I save the lift log
    And I select "Boring But Big" assistance work
    And I save the boring but big assistance work
    Then I am on the track tab