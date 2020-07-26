class OrdersController < ApplicationController
  require 'stripe'
  # This is your real test secret API key.
  Stripe.api_key = 'sk_test_51H8Ey8DQZ0bf1tPmINx6QhiUTJwPFKoV5XNedY6w6bfYQ9CsXL67rBpK2voJMmYBNGUYNwKvkF2Cguq3YsHJDhYe00Q5AojoJ6'
  skip_before_action :verify_authenticity_token

  def create
    order = Order.new(order_params)
  end

  def create_payment_intent
    order = Order.find(params[:order_id])

    payment_intent = Stripe::PaymentIntent.create(
      amount: order.total_price_cents,
      currency: 'usd'
    )
    puts payment_intent
    response = { clientSecret: payment_intent['client_secret'], }
    render json: response
  end

  def stripe_payment_results
    order = Order.find(params[:order_id])
    result = params[:result]
    puts result
    if result.key?("error")
      order.payment_intent_id = result[:error][:payment_intent][:id]
      order.payment_method_id = result[:error][:payment_method][:id]
      order.save!
    elsif result[:paymentIntent][:status] == "succeeded"
      order.payment_intent_id = result[:paymentIntent][:id]
      order.payment_method_id = result[:paymentIntent][:payment_method]
      order.processed = true
      order.save! 
    else
      puts "NOOOOOPE"
    end
  end

  private

  def order_params
    params.require(:order).permit(:user_id, :processed, :total_price_cents)
  end

end
