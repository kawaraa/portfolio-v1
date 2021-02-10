class CheckoutResolver {
  constructor(router, stripe) {
    this.router = router;
    this.stripe = stripe;
  }
  resolve() {
    this.router.post("/checkout/english-book", this.respond.bind(this));
  }
  async respond(request, response) {
    try {
      const productImages = ["/media/english-secrets.png"];

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card", "ideal"],
        line_items: [
          {
            quantity: productImages.length,
            price_data: {
              currency: "eur",
              product_data: {
                name: "English Secrets E-Book",
                images: productImages.map((url) => env.ORIGIN + url),
              },
              unit_amount: 100,
            },
          },
        ],
        mode: "payment",
        success_url: `${env.ORIGIN}/success.html`,
        cancel_url: `${env.ORIGIN}/english-book`,
      });

      response.json({ id: session.id });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CheckoutResolver;
