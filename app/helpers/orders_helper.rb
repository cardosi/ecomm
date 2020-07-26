module OrdersHelper
  def cart_count(order_id)
    LineItem.where(order_id: order_id).sum(:quantity)
  end
end
