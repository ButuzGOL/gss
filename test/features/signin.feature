Feature: Signin
  As a user of system
  I want to send email and password to get access token for system using
  
  Scenario: Unsuccessful signin
    Given a user visits the home page
    When he submits invalid signin information
    Then he should see an error message

  Scenario: Successful signin
    Given a user visits the home page
      And the user has an account
    When the user submits valid signin information
    Then he should see a signout link