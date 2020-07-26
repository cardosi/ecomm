class LineItemsController < ApplicationController
  def create
    line_item = LineItem.new(line_item_params)
  end

  def add_to_cart
    product = Product.find(params[:product_id])
    order = Order.find(params[:order_id])
    li = LineItem.where(order_id: order.id, product_id: product.id).first
    if li.nil?
      LineItem.create(
        {
          :order_id=>order.id,
          :product_id=>product.id,
          :price_cents=>product.price_cents,
          :total_price_cents=>product.price_cents
        }
      )
    else
      li.total_price_cents += product.price_cents
      li.quantity += 1
      li.save!
    end
    order.total_price_cents += product.price_cents
    order.save!
    redirect_to "/"
  end

  def remove_from_cart
    li = LineItem.find(params[:line_item_id])
    order = Order.find(params[:order_id])
    order.total_price_cents -= li.total_price_cents
    order.save!
    li.destroy!
    redirect_to cart_path(order_id: order.id)
  end

  private

  def line_item_params
    params.require(:line_item).permit(:order_id, :product_id, :quantity, :price_cents, :total_price_cents)
  end
end
