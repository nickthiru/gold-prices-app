Feature: Send email alert
Enables end users to be notified of price changes

  # Story: Sign up for email alerts

    # Rule: 

    Scenario: Registered users can subscribe for email alerts
      Given I am a registered user

        # Have an input box on frontend to sign up

      When I sign up for email alerts

        # Will the emails need to be saved in DDB Table? So that
        # a Lambda can read from it and send out the emails?
        # Use Data Access Object (from Lambda Layer?)

      Then I should receive a confirmation that I have signed up for email alerts


  # Story: Receive an email when prices change

    # Rule: 

    Scenario: Send an email to subscribers when prices change
      Given I have signed up for email alerts

        # There is no need to get subscribers email from the Table.
        # The previous scenario has already tested this.        

      When prices change

      Then I should receive an email with a table of prices

        # I need to register an "email identity" in SES
