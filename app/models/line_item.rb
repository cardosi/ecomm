class LineItem < ApplicationRecord
  belongs_to :order
  belongs_to :product

  def price
    price_cents / 100
  end

  def total_price
    total_price_cents / 100
  end
end
