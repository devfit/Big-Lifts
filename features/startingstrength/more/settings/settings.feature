@StartingStrength
Feature: StartingStrength Settings

  Scenario: Has rounding options
    When I navigate to the "More" tab
    And I tap the "Settings" list item
    Then There is a "Round to" form label
    Then There is a "Rounding" form label

  Scenario: Navigating to settings
    When I navigate to the "Edit" tab
    And I set the "Bench" input to "100"

    When I navigate to the "More" tab
    And I tap the "Settings" list item
    Then There is a "Units" form label
    And I set select "units" to "kg"
    And I tap the "Back" button
    And I navigate to the "Lift" tab
    And I tap the "Start" button
    And I tap the "Next" button
    And I tap the "Next" button
    And I tap the "Save" button
    And I navigate to the "Edit" tab
    Then The "Bench" input is "102"


