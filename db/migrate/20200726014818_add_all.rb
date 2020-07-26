class AddAll < ActiveRecord::Migration[6.0]
  def change
    create_table "carts", force: :cascade do |t|
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
    end
  
    create_table "line_items", force: :cascade do |t|
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.integer "quantity", default: 1
      t.integer "price_cents", default: 0
      t.integer "total_price_cents", default: 0
      t.integer "product_id"
      t.integer "order_id"
      t.index ["order_id"], name: "index_line_items_on_order_id"
      t.index ["product_id"], name: "index_line_items_on_product_id"
    end
  
    create_table "orders", force: :cascade do |t|
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.boolean "processed", default: false
      t.integer "total_price_cents", default: 0
      t.string "payment_intent_id"
      t.string "payment_method_id"
      t.string "address"
      t.string "city"
      t.string "zip"
      t.string "state"
      t.string "name"
      t.string "email"
      t.string "phone"
    end
  
    create_table "products", force: :cascade do |t|
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
      t.string "name"
      t.string "description"
      t.string "image"
      t.integer "price_cents", default: 0
      t.string "color"
    end
  
    create_table "users", force: :cascade do |t|
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
    end
  
    add_foreign_key "line_items", "orders"
    add_foreign_key "line_items", "products"
  end
end
