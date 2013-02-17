Feature: User Setup

  @531
  Scenario: User setup can be reached after a routine has loaded
    When I tap the "More" tab
    And I tap the "Setup..." list item
    And I tap the user icon
    And A user loads with username "bob" and password "password"
    Then The "User" input is "bob"

  Scenario: User data is populated in the user setup
    When I tap the user icon
    Then The "User" input is "Loading..."
    Then The "Password" input is "Loading..."
    And A user loads with username "bob" and password "password"
    Then The "User" input is "bob"
    Then The "Password" input is "password"

  Scenario: Username can be changed
    When I tap the user icon
    And A user loads with username "bob" and password "password"
    And I set the "User" input to "bob2"
    And I tap the "Save" button
    Then The "User" input is disabled
    And The user save responds with success, user changed
    Then The "User" input is enabled
    Then The user save flash message is "Username changed!"

  Scenario: Attempting to switch to an existing username without the correct password
    When I tap the user icon
    And A user loads with username "bob" and password "password"
    And I set the "User" input to "bob2"
    And I tap the "Save" button
    And The user save responds with existing user, bad password
    Then The user save flash message is "User exists, bad password"

