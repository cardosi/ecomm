# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

product1 = Product.create(
  {
    :name=>"997 Sport",
    :color=>"Black",
    :price_cents => 8900,
    :image => "shoes/997_sport_black.jpg"
  }
)

product2 = Product.create(
  {
    :name=>"997 - Made in the USA - Superfabric",
    :color=>"Green",
    :price_cents => 21000,
    :image => "shoes/997_superfabric_green.jpg"
  }
)

product3 = Product.create(
  {
    :name=>"997 - Made in the USA - Bison",
    :color=>"Black",
    :price_cents => 16900,
    :image => "shoes/997_usa_bison_black.jpg"
  }
)

product4 = Product.create(
  {
    :name=>"997 Sport Made in the USA",
    :color=>"Black & White",
    :price_cents => 16000,
    :image => "shoes/997_usa_bw.jpg"
  }
)

product5 = Product.create(
  {
    :name=>"997s",
    :color=>"Gunmetal",
    :price_cents => 10000,
    :image => "shoes/997s_gunmetal.jpg"
  }
)

product6 = Product.create(
  {
    :name=>"997s",
    :color=>"White",
    :price_cents => 10000,
    :image => "shoes/997s_white.jpg"
  }
)