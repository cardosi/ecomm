class Product < ApplicationRecord
  has_many :line_items

  def price
    price_cents / 100
  end
end
