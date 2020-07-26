Rails.application.routes.draw do
  root 'application#home'

  get '/about' => 'application#about'
  get '/cart' => 'application#cart'
  get '/checkout' => 'application#checkout'
  post '/create-payment-intent' => 'orders#create_payment_intent'
  put '/stripe-payment-results' => 'orders#stripe_payment_results'

  resource :line_item, only: [] do
    post    :add_to_cart
    delete  :remove_from_cart
  end
end
