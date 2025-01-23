# E-Commerce project
An e-commerce website is an online platform that allows individuals to buy products over the internet. It acts as a digital storefront where customers can browse, select, and purchase items, often with a secure payment process. E-commerce websites are commonly used by a wide range of businesses, from small startups to large enterprises.

<br/>

[Live Production](https://ebuy-frontend-fa9dc5581b28.herokuapp.com/products) 

<br/>

![](documentation/Testing/Responsive/am_i_responsive.png)

<br/>

## Table of Contents
### [User Experience](#user-experience-ux)
* [Project Goals](#project-goals)
* [Agile Methodology](#agile-methodology)
* [Target Audience](#target-audience)
* [First time user](#first-time-user)
* [Registered user](#registered-user)
### [Design](#design-1)
* [Color Scheme](#color-scheme)
* [Wireframes](#wireframes)
* [User Journey](#user-journey)
### [Security Features](#security-features-1)
### [Features](#features-1)
* [Existing Features](#existing-features)
* [Features Left to Implement](#features-left-to-implement)
### [Technologies Used](#technologies-used-1)
* [Languages Used](#languages-used)
* [Frameworks Used](#frameworks-used)
* [Programs Used](#programs-used)
### [Deployment and Local developement](#deployment-and-local-developement-1)
* [Local Developement](#local-developement)
* [Heroku Deployment](#heroku-deployment)
### [Testing](#testing-1)
### [References](#references-1)
* [Docs](#docs)
* [Content](#content)
* [Acknowledgments](#acknowledgments)


---

## User Experience (UX) Optimization
* Intuitive navigation: Ensure the site is easy to navigate, with a clear structure (categories, filters, etc.) that helps users find products easily.
* Mobile responsiveness: Ensure the website functions well on all devices, including mobile phones and tablets.
* Fast loading times: Optimize performance so pages load quickly, reducing bounce rates.
* Accessible design: Ensure that the website is accessible to all users, including those with disabilities.

### Project Goals
#####  Increasing Sales and Conversion Rates
* Streamlined checkout process: Make the checkout experience as simple and quick as possible to reduce cart abandonment.
* Multiple payment options: Offer different payment methods (credit cards, PayPal).

### Target Audience
* Luxury Shoppers: Customers looking for high-end, exclusive, or premium products (e.g., designer clothing, luxury watches, fine jewelry, and gourmet items).
* Pet Owners: Buyers looking for pet products, from food and toys to grooming and healthcare items.
* Looking for clothes

### First time user
* Customer can see or look for product and see information about product

### Registered user
* can Order
* can contact with our customer support team for any order issues
* can see their orders' history


---

## Design
* The website provides an intuitive menu structure which is easy to understand and accessible such as sign in - sign up and home page icon, in addition to search field at top which enable the customer from about products by category

### Color Scheme
* #2142b2 - #7177a1 - #ff9254 - #242a3d - #4d68c1 

### Wireframes
<details>
<summary> Home Page on laptop before sign in 
</summary>

![Home Page](documentation/Wireframe/wire_frame_index_laptop.png)
</details>

<details>
<summary> Home Page on laptop after sign in 
</summary>

![Logged in user Home Page](documentation/Wireframe/wire_frame_index_laptop_after_login.png)
</details>

<details>
<summary> Home Page on mobile before sign in 
</summary>

![Home Page](documentation/Wireframe/wire_frame_index_mobile.png)
</details>


<details>
<summary> Home Page on mobile after sign in 
</summary>

![Home Page](documentation/Wireframe/wire_frame_index_mobile_after_login.png)
</details>


<details>
<summary> Sign Up
</summary>

![Home Page](documentation/Wireframe/wire_frame_sign_up.png)
</details>

<details>
<summary> Sign In
</summary>

![Home Page](documentation/Wireframe/wire_frame_sign_in.png)
</details>

<details>
<summary> Checkout Order Details
</summary>

![Home Page](documentation/Wireframe/wire_frame_checkout_cart.png)
</details>

<details>
<summary> Checkout Address
</summary>

![Home Page](documentation/Wireframe/wire_frame_checkout_address.png)
</details>

<details>
<summary> Checkout Payment Method
</summary>

![Home Page](documentation/Wireframe/wire_frame_checkout_paiment.png)
</details>



###

## Security Features
### User Authentication

* Django Allauth is a popular authentication and authorization library for Django, which provides a set of features for managing user authentication, registration, and account management.

### CSRF Protection

* Django provides built-in protection against Cross-Site Request Forgery (CSRF) attacks. CSRF tokens are generated for each user session, and they are required to submit forms or perform state-changing actions. When a user logs out, the session and associated CSRF token are invalidated, making it difficult for an attacker to forge a valid request using a copied URL.

### Custom error pages

* 500 Error Page, when there is no network with the server

## [Features]
* Navbar: In the navbar user have 4 options and search textbox  
    1. Home to move to home page where the reservation is found
    2. Cart icon to checkout
    3. Sign in to move to sign in page
    4. Sign up to move to sign up page
    5. Search textbox to search for products per category
<br/>

![](documentation/Features/navbar.png)

<br/>

* Products: In this section customer can find all the products  and information about each one ex:
Image - Name - Price - Color - Size
at the end of the products cart there is a plus icon which enables the costumer adding product with the selected count to the shopping cart.
<br/>

![](documentation/Features/products.png)

<br/>

![](documentation/Features/addproduct.png)

<br/>

* Sign up: the customer can create an account by filling out the form [ username - password - confirm password ]
<br/>

![](documentation/Features/signup_page.png)

<br/>

* Sign in: the customer can sign in by filling out the form [ username - password ]
<br/>

![](documentation/Features/signin_page.png)

<br/>

* Cart icon: After we add products to the cart a badge icon will be appear on the the shopping cart with the number of added items
<br/>

![](documentation/Features/cart_icon_after_adding_items.png)

<br/>

* Checkout: After we add products to the cart customer presses on cart icon so checkout page is opened
    * First step is the order details so customer can see all the selected items with the info details and customer can alse change the count of the any product here by choosing any number from the select tag
<br/>

![](documentation/Features/checkout_page.png)

<br/>

* At the buttom of the Checkout page there is a button to proceed checkout

<br/>

![](documentation/Features/proceed.png)

<br/>