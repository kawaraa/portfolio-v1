class DonateResolver {
  constructor(router, stripe) {
    this.router = router;
    this.stripe = stripe;
  }
  resolve() {
    this.router.post("/payment-session", this.respond.bind(this));
  }

  async respond(request, response) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card", "ideal"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "English E-Book",
                images: ["https://i.imgur.com/EHyR2nP.png"],
              },
              unit_amount: 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${env.domain}/success`,
        cancel_url: `${env.domain}/cancel`,
      });

      response.json({ id: session.id });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DonateResolver;
