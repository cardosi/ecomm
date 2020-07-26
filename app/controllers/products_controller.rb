class ProductsController < ApplicationController
  def create
    product = Product.new(product_params)
  end

  private

  def product_params
    params.require(:product).permit(:name, :image, :price_cents)
  end
end
