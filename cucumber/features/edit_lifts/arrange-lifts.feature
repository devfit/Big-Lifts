@531
Feature: Arrange lifts
  As a lifter
  I want to be able to arrange lifts
  So that the lift schedule exactly matches my own preferred programming

  Scenario: Default ordering
    When I navigate to the lift schedule
    Then The lift schedule orders lifts as "Press,Deadlift,Bench,Squat"

  Scenario: Arrange a newly added lift
    When I navigate to the lift editor
    When I add a new lift named "TestLift" with max 100
    And I tap the "Edit" button
    And I tap the "Arrange" button
    And I tap the "TestLift" list item
    And I tap the move up button
    And I tap the move up button
    And I tap the move down button
    And I tap the "Done" button
    And I navigate to the lift schedule
    Then The lift schedule orders lifts as "Press,Deadlift,Bench,TestLift,Squat"

  Scenario: Moving the top item down 1
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I tap the "Arrange" button
    And I tap the "Press" list item
    And I tap the move down button
    And I tap the "Done" button
    And I navigate to the lift schedule
    Then The lift schedule orders lifts as "Deadlift,Press,Bench,Squat"

  Scenario: Moving the bottom item up 1
    When I navigate to the lift editor
    And I tap the "Edit" button
    And I tap the "Arrange" button
    And I tap the "Squat" list item
    And I tap the move up button
    And I tap the "Done" button
    And I navigate to the lift schedule
    Then The lift schedule orders lifts as "Press,Deadlift,Squat,Bench"