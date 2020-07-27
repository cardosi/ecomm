# Stripe E-Commerce Demo

#### This is a demonstration of a Stripe integration built on a Rails e-commerce app

## Live Demo
https://cardosi-ecomm.herokuapp.com/



### My Approach
When building this app I thought it would be useful to imagine I was building a demo for a perspective Stripe client, so I chose New Balance. Three goals came to mind when I imagined building a demo for a client:
1. Build the App

   I wanted to only build the features that would be necessary to demonstrate a Stripe integration and allow the user of the demo to envision using Stripe on their site. I didn't put any time or effort into things like testing, security, session management, etc. When I was styling the app, I didn't want to invest too much time into polishing. However, I did try to utilize design cues of the brand that were easy to implement, like font and color scheme.
1. Integrate Stripe

    My goal with the integration was simply to allow a user to complete the payment flow and experience Stripe. I started the process by looking at the different options on Stripe's website. I saw that the PaymentIntent API seemed to be more extensible, so I thought it would be a better fit for a large company like New Balance. During the actual integration process, my goal was to highlight the simplicity of Stripe's tools, while also demonstrating that they were in capable hands. So, I kept things very similar to Stripe's guides but made a couple small tweeks.

1. Explain the Demo

   The documentation on the About page was written for the prospective Stripe customer. It was written to explain what is happening in the demo and highlight some of Stripe's capabilities. It's geared towards an audiance with some technical experience, but the reader doesn't need development experience to grasp the concepts. I wanted it to live on the demo itself (as opposed to putting in this README) because I thought sending a less technical audiance to Github might be intimidating.



### Extending The App
The value of the demo comes from it's ability to convey the benefits of Stripe. So if I were to extend the app, I could take a qualitative or quantitative approach. The qualitative approach would focus on changing the app to better communicate the benefits of Stripe. I could do this by:
* Taking some of the documentation and adding it to the checkout flow in the form of tooltips or modals so that the user can more easily connect the dots
* Add a walk though that uses Stripe's different test card data to explicitly show how each scenario is handled gracefully
* Learn more about New Balance's current payments solution so that I could highlight Stripe's advantages

A quantitative approach to extending the demo would involve adding to the Stripe integration so that it would demonstrate more of Stripe's capabilities. Deciding which of Stripe's capabilities to highlight would require a converstaion with the prospect themselves to determine what their needs are. However, if I were to guess, this is where I would start:
* The Sigma product could provide a new level of business intellegence that could be utilized by many different departments (ie. finance, marketing, product, engineering, and operations)
* Radar for Fraud Teams could have an immediate impact on revenue by allowing New Balance to dictate what they're risk tolerance is, resulting in a lower instance of fraud, less blocking of legitimate customers, or both

### Technologies Used
This app was built using Ruby on Rails, PostgreSQL, Bootstrap, and Heroku. All of these technologies were choosen becuase of their ease of development and my familiarity with them. I was looking for "batteries included" options across the board.
* Ruby 2.6.3
* Rails 6.0.3.2





