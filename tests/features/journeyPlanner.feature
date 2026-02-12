@ui @regression
Feature: As a user I should be able to Plan and Update Journey details successfully
    
    Background: Test Journey Planner page
        Given the user is on the Plan A Journey page
        Then user should see the Plan A Journey page title as "Plan a journey"
        And user enters the From location as "Leicester Square"
        And user enters the To location as "Covent Garden"
        When user clicks on the "Plan my journey" button

    Scenario: Verify user can Plan a Journey with the default Journey preferences
        Then user should see the Walking and Cycling time results

    Scenario: Verify user can update the Journey preferences to see the least walking routes
        When user clicks on the "Edit preferences" button
        Then user should see the Public Transport tab under the Edit Preferences page
        And user selects the "Routes with least walking" option
        And user clicks on the "Update journey" button
        Then user should see View Details button in the updated journey planner results page
        Then user should see the updated journey planner results time with the least walking routes

    Scenario: Verify Complete access information at Covent Garden Underground station under View Details section
        When user clicks on the "Edit preferences" button
        And user selects the "Routes with least walking" option
        And user clicks on the "Update journey" button
        And user clicks on the View details button in the updated journey planner results page
        Then user should see the access information for Covent Garden Underground station in the updated journey planner results page
