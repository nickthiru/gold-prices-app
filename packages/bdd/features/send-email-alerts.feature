Feature: Send email alert
Enables notifitions of prices changes

    As a retail gold buyer
    I want to see the latest prices
    So that I can make comparisons of prices

    Rule: Rule name

    Scenario: Display latest price of 22K gold from each website
        Given I login
        When I visit the homepage
        Then I should see the latest prices displayed
