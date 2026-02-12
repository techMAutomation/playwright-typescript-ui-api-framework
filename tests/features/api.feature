@api @regression
Feature: Open Library Books API tests

    Scenario: Verify Open Library API Response time within the acceptable limit
        When the user sends a GET request for the ISBN details with bibkeys "ISBN:0201558025,LCCN:93005405,ISBN:1583762027"
        Then the response time should be less than 15000 milliseconds

    Scenario: Verify API Response code 200 for valid bibkeys
        When the user sends a GET request for the ISBN details with bibkeys "ISBN:0201558025,LCCN:93005405,ISBN:1583762027"
        Then the response code should be 200

    Scenario: Verify API Response returns correct number of results
        When the user sends a GET request for the ISBN details with bibkeys "ISBN:0201558025,LCCN:93005405,ISBN:1583762027"
        Then the response should contain 3 results

    Scenario: Verify API Response returns correct results based on the requested bibkeys
        When the user sends a GET request for the ISBN details with bibkeys "ISBN:0201558025,LCCN:93005405,ISBN:1583762027"
        Then the response should contain bibkeys
        And each result should contain correct book details based on each bibkey

    Scenario: Verify thumbnail images match the stored images based on the ISBNS values
        When the user sends a GET request for the ISBN details with bibkeys "ISBN:0201558025,LCCN:93005405,ISBN:1583762027"
        Then the thumbnail image for "ISBN" "ISBN:0201558025" should match the stored image
        And the thumbnail image for "ISBN" "ISBN:1583762027" should match the stored image
        And the thumbnail image for "LCCN" "LCCN:93005405" should match the stored image

    # Additional scenarios

    Scenario: Verify requesting the same ISBN twice returns one result
        When the user sends a GET request for Book details with duplicate ISBNs "ISBN:0201558025,ISBN:0201558025"
        Then the response should contain 1 results
        And the response should contain the bibkey "ISBN:0201558025"

    Scenario: Invalid bibkey in the request
        When the user sends a GET request for Book details with an invalid bibkey "ISBN:12345abcde"
        Then the response code should be 200
        And the response should be empty
    