// A reference to Stripe.js initialized with your real test publishable API key.
var stripe = Stripe("pk_test_51H8Ey8DQZ0bf1tPmAMGOstLrj5jVqMQiJywcxZNAqUoT6ma2FxOS3aBNGhWBnFPhQ5xoSZgrc6q6Ldkgv7dPX1Gi0035AE7WQA");
// The items the customer wants to buy
document.addEventListener("DOMContentLoaded", function(event) {
  var order_id = document.getElementById("order_id").innerHTML;
  var purchase = {
    // items: [{ id: "xl-tshirt" }]
    order_id: order_id
  };

// Disable the button until we have Stripe set up on the page
// document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelector("button").disabled = true;
// });

  fetch("/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(purchase)
  })
    .then(function(result) {
      return result.json();
    })
    .then(function(data) {
      var elements = stripe.elements();
      var style = {
        base: {
          color: "#32325d",
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d"
          }
        },
        invalid: {
          fontFamily: 'Arial, sans-serif',
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      };

      var card = elements.create("card", { style: style });
      // Stripe injects an iframe into the DOM
      card.mount("#card-element");
      // var cardNumber = elements.create('cardNumber', { style: style });
      // cardNumber.mount('#card-number');

      // var cardExpiry = elements.create('cardExpiry', { style: style });
      // cardExpiry.mount('#card-expiry');

      // var cardCvc = elements.create('cardCvc', { style: style });
      // cardCvc.mount('#card-cvc');

      card.on("change", function (event) {
        // Disable the Pay button if there are no card details in the Element
        document.querySelector("button").disabled = event.empty;
        document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
      });
      var form = document.getElementById("payment-form");
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        // Complete payment when the submit button is clicked
        payWithCard(stripe, card, data.clientSecret);
      });
    });
  // Calls stripe.confirmCardPayment
  // If the card requires authentication Stripe shows a pop-up modal to
  // prompt the user to enter authentication details without leaving your page.
  var payWithCard = function(stripe, card, clientSecret) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var zip = document.getElementById("zip").value;
    var state = document.getElementById("state").value;
    loading(true);
    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
            phone: phone,
            address: {
              city: city,
              line1: address,
              postal_code: zip,
              state: state
            }
          },
        }
      })
      .then(function(result) {
        if (result.error) {
          // Show error to your customer
          showError(result.error.message);
          returnResults(result);
        } else {
          // The payment succeeded!
          orderComplete(result.paymentIntent.id);
          returnResults(result);
        }
      });
  };
  // Send the results back to the server so they can be saved with the order
  var returnResults = function(result) {
    var response = {
      result: result,
      order_id: order_id
    }
    fetch("/stripe-payment-results", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    })
  };
});
/* ------- UI helpers ------- */
// Shows a success message when the payment is complete
var orderComplete = function(paymentIntentId) {
  loading(false);
  document
    .getElementById("payment-intent-id")
    .innerText = paymentIntentId
  // document
  //   .querySelector(".result-message a")
  //   .setAttribute(
  //     "href",
  //     "https://dashboard.stripe.com/test/payments/" + paymentIntentId
  //   );
  document.querySelector(".result-message").classList.remove("d-none");
  document.querySelector("button").disabled = true;
};
// Show the customer the error from Stripe if their card fails to charge
var showError = function(errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function() {
    errorMsg.textContent = "";
  }, 4000);
};
// Show a spinner on payment submission
var loading = function(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("button").disabled = true;
    document.querySelector("#spinner").classList.remove("d-none");
    document.querySelector("#button-text").classList.add("d-none");
  } else {
    document.querySelector("button").disabled = false;
    document.querySelector("#spinner").classList.add("d-none");
    document.querySelector("#button-text").classList.remove("d-none");
  }
};