@ui @smoke @regression
Feature: As a user I should be able to Plan and Update Journey details successfully
    
    Background: Test Journey Planner page
        Given the user is on the Plan A Journey page
        Then user should see the Plan A Journey page title as "Plan a journey"

    Scenario: Verify that the widget is unable to plan a journey if one or more invalid locations are entered into the widget.
        And user enters invalid From location as "New York, USA"
        Then user should not see any auto suggestions dropdown for the "From" location field
        And user enters invalid To location as "Withheld"
        Then user should not see any auto suggestions dropdown for the "To" location field

    Scenario: Verify that the widget is unable to plan a journey if no locations are entered into the widget.
        When user clicks on the "Plan my journey" button
        Then user should see "From" location field error message as "The From field is required."
        And user should see "To" location field error message as "The To field is required." 

    Scenario: Verify that the widget should show error message when entered invalid locations into the widget.
        And user enters invalid From location as "1234"
        And user enters invalid To location as "1234testing"
        When user clicks on the "Plan my journey" button
        Then user should see no matching journey error message as "Journey planner could not find any results to your search. Please try again"
