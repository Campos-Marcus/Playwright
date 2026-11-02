Feature: Ecommerce validations

    Scenario: Placing the Order
        Given a login to Ecommer ce application with "mike.testman@mailinator.com" and "Team123!"
        When Add "zara coat 3" to Cart
        Then Verify "zara coat 3" is displayed in the Cart
        When Enter valid details and Place the Order
        Then Verify order is present in the Orderhistory
