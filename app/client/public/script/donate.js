console.log("Hello from Donate page");

var stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
var elements = stripe.elements();

var options = {
  // Custom styling can be passed to options when creating an Element
  style: {
    base: {
      padding: "10px 12px",
      color: "#32325d",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
  },
};

// Create an instance of the idealBank Element
var idealBank = elements.create("idealBank", options);

// Add an instance of the idealBank Element into
// the `ideal-bank-element` <div>
idealBank.mount("#ideal-bank-element");

const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  payment_method_types: ["ideal"],

  // or you can take multiple payment methods with
  // payment_method_types: ['card', 'ideal', ...]
  line_items: [
    {
      price_data: {
        currency: "usd",
        // To accept `ideal`, all line items must have currency: `eur`
        currency: "eur",
        product_data: {
          name: "T-shirt",
        },
        unit_amount: 2000,
      },
      quantity: 1,
    },
  ],
  mode: "payment",
  success_url: "https://example.com/success",
  cancel_url: "https://example.com/cancel",
});

// var urlParams = new URLSearchParams(window.location.search);
// var paymentIntentId = urlParams.get("payment_intent");
// console.log(paymentIntentId);
// if (paymentIntentId) {
//   fetch("/payment-intent?paymentIntentId=" + paymentIntentId)
//     .then(function (result) {
//       return result.json();
//     })
//     .then(function (paymentIntent) {
//       if (paymentIntent.status !== "succeeded") {
//         document.querySelector(".sr-result p").textContent = "Payment did not succeed";
//       }
//       var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
//       document.querySelector("pre").textContent = paymentIntentJson;
//       setTimeout(function () {
//         document.querySelector(".sr-result").classList.add("expand");
//       }, 200);
//     })
//     .catch(function (err) {
//       console.log("Error when fetching PaymentIntent", err);
//     });
// }
