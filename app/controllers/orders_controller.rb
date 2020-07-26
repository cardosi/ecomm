class OrdersController < ApplicationController
  require 'stripe'
  # This is your real test secret API key.
  Stripe.api_key = ENV['STRIPE_API_KEY']
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
    response = { clientSecret: payment_intent['client_secret'], }
    render json: response
  end

  def stripe_payment_results
    order = Order.find(params[:order_id])
    result = params[:result]
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
    end
  end

  private

  def order_params
    params.require(:order).permit(
      :processed,
      :total_price_cents,
      :payment_intent_id,
      :payment_method_id,
      :address,
      :city,
      :zip,
      :state,
      :name,
      :email,
      :phone
    )
  end
end
