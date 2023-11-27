Feature: Display gold price
Display gold price from various jewelers

  # Story: View the latest price

    # Rule: 

    Scenario: View the latest price
      Given I want to see the latest price for each website

        # Web scraper will run and save the data

      When I visit the homepage

        # Fetch the latest price for each website

      Then I should see a table of the latest price for each website

        # Display the table of prices for each website
