@531
@premium
Feature: Smart navigation after saving a log

  Scenario: Asst toggle off should go to the track tab
    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I toggle "Asst."
    And I tap the "Save" button
    And I wait for the animation
    Then I am on the track tab


  Scenario: Asst toggle on with no prior entries should go to the assistance chooser
    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation
    Then The page title is "Assistance"

  Scenario: Asst toggle on with prior entry should go to that entry
    When I tap the assistance tab
    And I select "Bodyweight" assistance work
    And I tap the "Squat" list item
    And I tap the "Save" button
    And I wait for the animation

    When I view the squat lift schedule for week 1
    And I tap the checkmark
    And I tap the "Save" button
    And I wait for the animation
    Then The page title is "Bodyweight"



