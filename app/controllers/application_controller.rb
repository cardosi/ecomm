class ApplicationController < ActionController::Base
  layout "checkout", only: [:checkout]

  def home
    @products = Product.all
    order = Order.where(processed: false).last
    order.nil? ? @order = Order.create : @order = order
  end

  def cart
    @order = Order.find(params[:order_id])
    @line_items = @order.line_items
  end

  def checkout
    @order = Order.find(params[:order_id])
  end

  def about
  end
end
