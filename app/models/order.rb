class Order < ApplicationRecord
  has_many :line_items

  def total_price
    total_price_cents / 100
  end
end
