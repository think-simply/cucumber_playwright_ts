Feature: Homepage Functionality

  Background:
    Given User navigates to Login page

  @high
  Scenario: 1.Verify Login with invalid data:<Description>
    When User inputs data with "<UserName>" and "<Password>"
    Then "<Error>" message will be displayed

    Examples:
      | Description                           | UserName | Password | Error                                                                     |
      | invalid username and invalid password | Heath93  | Heath93  | Epic sadface: Username and password do not match any user in this service |
      | empty username                        |          | Heath93  | Epic sadface: Username is required                                        |
      | empty password                        | Heath93  |          | Epic sadface: Password is required                                        |

  @high
  Scenario: 2.Verify Login with valid data:<Description>
    When User inputs data with "<UserName>" and "<Password>"
    Then User will nagivate to Inventory page

    Examples:
      | Description               | UserName      | Password     |
      | correct username and pass | standard_user | secret_sauce |

  @low
  Scenario: 3.Should display 6 items on Inventory page
    When User inputs data with "<UserName>" and "<Password>"
    Then User will nagivate to Inventory page
    And There are 6 items on Inventory page

    Examples:
      | Description               | UserName      | Password     |
      | correct username and pass | standard_user | secret_sauce |

  @high
  Scenario: 4.User should be able to add item to cart
    When User inputs data with "<UserName>" and "<Password>"
    Then User will nagivate to Inventory page
    And User is able to add item to cart

    Examples:
      | Description               | UserName      | Password     |
      | correct username and pass | standard_user | secret_sauce |

  @high
  Scenario: 5.Cart should display the correct number of added item
    When User inputs data with "<UserName>" and "<Password>"
    And User add items to cart
    Then cart should display the correct number of added item

    Examples:
      | Description               | UserName      | Password     |
      | correct username and pass | standard_user | secret_sauce |

  @high
  Scenario: 6.Should display the correct order of item when filter is set to Price low to High
    When User inputs data with "<UserName>" and "<Password>"
    Then User will nagivate to Inventory page
    And Should display the correct order of item when filter is set to Price low to High

    Examples:
      | Description               | UserName      | Password     |
      | correct username and pass | standard_user | secret_sauce |

  @high
  Scenario: 7.Should display the correct number of item when remove item from cart
    When User inputs data with "<UserName>" and "<Password>"
    And User add items to cart
    Then cart should display the correct number of added item
    And should display the correct number of item when remove item from cart

    Examples:
      | Description               | UserName      | Password     |
      | correct username and pass | standard_user | secret_sauce |

  @high @now
  Scenario: 8.Should display the correct total price of added item when checking out
    When User inputs data with "<UserName>" and "<Password>"
    And User add items to cart
    And User go to checkout page
    And User fill infor to checkout "<data1>" "<data1>" "<data1>"
    Then Should display the correct total price of added item

    Examples:
      | UserName      | Password     | data1 |
      | standard_user | secret_sauce |    12 |
