@outOfScope
Feature: As a user I should be able to Plan and Update Journey details successfully
    
    Background: Test Journey Planner page
        Given the user is on the Plan A Journey page
        Then user should see the Plan A Journey page title as "Plan a journey"
        And user enters the From location as "Leicester Square"
        And user enters the To location as "Covent Garden"
        When user clicks on the "Plan my journey" button

    Scenario: Verify user can Update the Journey details in the Edit Journey page
        Then user should see the Walking and Cycling time results
        When user clicks on the "Edit journey" button
        Then user should be able to switch the From and To fields locations in the Edit Journey page
        And user clicks on the close icon to clear the text in the From and To fields
        And user should be able to enter new locations in the From and To fields in the Edit Journey page
        And user is able to change the "Leaving" Journey date and time in the Edit Journey page
        And user is able to change the "Arriving" Journey date and time in the Edit Journey page
        And user clicks on the "Update journey" button 
        Then user should see the updated Journey Planner results with the new From and To locations and timings

    Scenario: Verify user can Cancel the updated Journey details in the Edit Journey page
        Then user should see the Walking and Cycling time results
        When user clicks on the "Edit journey" button
        And user clicks on the close icon to clear the text in the From and To fields
        When user clicks on the "Cancel" button 
        Then user should see the original Journey Planner results without any changes

    Scenario: Verify user can navigate to the Google Maps and View Directions webpages in Journey Planner results page
        Then user should see the Walking and Cycling time results
        When user clicks on Walking route option in the Journey Planner results page
        Then user should see the "View directions" button for the Walking route option
        When user clicks on the "View directions" button for the Walking route option
        Then user should see the Start and Stop locations directions in the Walking route option section
        And user clicks on the "Hide directions" button
        When user clicks on the "Open in Google Maps" button
        Then user should be navigated to the Google Maps webpage in a new tab with the correct From and To locations

    Scenario: Verify user can save the Journey preferences for future visits
        When user clicks on the "Edit preferences" button
        And user selects Travel by and Preferences options 
        And user checks the "Save these preferences for future visits" option
        And user clicks on the "Update journey" button
        When user visits the same Journey Planner page again
        Then user should see the previously saved Journey preferences selected in the Edit Preferences page

    Scenario: Verify user functionality Select All and Deselect All in the Edit Preferences page
        When user clicks on the "Edit preferences" button
        And user clicks on the "Select all" button in the Edit Preferences page
        Then user should see all the Travel by and Preferences options are selected
        When user clicks on the "Deselect all" button in the Edit Preferences page
        Then user should see all the Travel by and Preferences options are unselected

    # NON-FUNCTIONAL SCENARIOS

    Scenario: Baseline Response Time for Journey Results
        Given the Journey Planner widget is under normal traffic conditions 
        And user enters the From location as "Leicester Square"
        And user enters the To location as "Covent Garden"
        When user clicks on the "Plan my journey" button
        Then the widget should load and display the journey results within 2 seconds 

    Scenario: System Stability under Peak Load
        Given a simulated peak traffic environment representing thousands of concurrent users 
        And users are planning journeys for a major event like New Year’s Eve 
        When multiple simultaneous journey requests are processed by the widget 
        Then the system should remain responsive without crashing 
        And all journey results should eventually be returned accurately 
