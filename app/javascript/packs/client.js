// A reference to Stripe.js initialized with your real test publishable API key.
var stripe = Stripe("pk_test_51H8Ey8DQZ0bf1tPmWNUCSek7zuuCJuZiH6CULu15oPdnKr3ORqdatfyfJRozmcBMBbGYP2qgcgl79E8NrMuLCNaH00Jp3LZsho");

// The items the customer wants to buy
document.addEventListener("DOMContentLoaded", function(event) {
  var order_id = document.getElementById("order_id").innerHTML;
  var purchase = {
    order_id: order_id
  };

// Disable the button until we have Stripe set up on the page
  document.querySelector("button").disabled = true;

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
  var paymentIntentLink = document.querySelector("#payment-intent-id");
  paymentIntentLink.innerText = paymentIntentId;
  paymentIntentLink.setAttribute("href", "https://dashboard.stripe.com/test/payments/" + paymentIntentId);
  
  document.querySelector(".result-message").classList.remove("d-none");
  document.querySelector("button").disabled = true;
  document.querySelector("#button-text").classList.add("d-none");
  document.querySelector("#success-button-text").classList.remove("d-none");
};
// Show the customer the error from Stripe if their card fails to charge
var showError = function(errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  var errorMsgTitle = document.querySelector("#card-error-title");
  errorMsgTitle.textContent = "Whoops";
  errorMsg.textContent = errorMsgText;
  setTimeout(function() {
    errorMsgTitle.textContent = "";
    errorMsg.textContent = "";
  }, 6000);
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