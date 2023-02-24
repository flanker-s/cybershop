const user = process.env.MONGO_INITDB_USERNAME;
const pwd = process.env.MONGO_INITDB_PASSWORD;
const appDatabase = process.env.MONGO_INITDB_DATABASE;
//Create the admin
db.createUser(
  {
    user: user,
    pwd: pwd,
    roles: [
      { role: "dbOwner", db: appDatabase },
    ]
  }
);
//Create features
const feature_result = db.features.insertOne({
  name: "Example feature. It could be 'Display' or something",
});
//Create properties
const property_name_result = db.property_names.insertOne({
  name: "Example property. Such as screen resolution",
  feature_id: feature_result.insertedId
});
const property_values_result = db.property_values.insertMany([
  {
    value: "1080*1920 for example",
    property_name_id: property_name_result.insertedId
  },
  {
    value: "720*1280 for another example",
    property_name_id: property_name_result.insertedId
  }
]);
//Create banners
db.banners.insertOne({
  name: "Example banner",
  img: "./example/some-image.img",
  url: "https://your-internal-page",
  template: "./example/some-template.tsx"
});
//Create categories
const category_result = db.categories.insertOne({
  name: "Products are pending for editing",
  category_banners: [],
  feature_ids: [feature_result.insertedId],
});
//Create products
const product_result = db.products.insertOne({
  name: "Example product",
  properties: [{
    name: property_name_result.insertedId,
    value: property_values_result.insertedIds[0]
  }],
  review: {
    name: "Title related to product",
    text: "Product info",
  },
  category_id: category_result.insertedId
});
//Create showcases
db.showcases.insertOne({
  product_ids: [product_result.insertedId],
  template: "./example/some-template.tsx"
});
//Create carts
db.carts.insertOne({
  name: "Example or a cart",
  cart_items: [{
    name: "Example product"
  }]
});
//Create shops
db.shops.insertOne({
  name: "Example shop. That's contact info that represent a shop from a real world.(Who knows what's real)",
  days_of_work: [
    { name: "Monday", hours: "9:00am - 5:00pm" },
    { name: "Tuesday", hours: "9:00am - 5:00pm" },
    { name: "Wednesday", hours: "9:00am - 5:00pm" },
    { name: "Thursday", hours: "9:00am - 5:00pm" },
    { name: "Friday", hours: "9:00am - 5:00pm" },
    { name: "Saturday", hours: "off" },
    { name: "Sunday", hours: "off" },
  ],
  holidays: [
    { name: "Shortened days 12/25/2080" }
  ]
});
//Create orders
db.createCollection("orders");
db.createCollection("delivery_methods");
//Create chats
db.createCollection("chats");
db.chats.insertOne({
  messages: []
});
//Create blogs
db.blogs.insertOne({
  name: "Main blog",
  articles: [{
    name: "Braindance addiction",
    img: "./example/img.url",
    text: "Arcticle text about braindance addiction"
  }]
});
//Create events
db.events.insertOne({
  name: "Example sale",
  description: "Sale summary"
});
//Create roles
db.createRole({
  role: "shopAdmin",
  privileges: [
    { resource: { db: appDatabase, collection: "users" }, actions: ["find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "property_names" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "property_values" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "features" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "products" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "products.properties" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "categories" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "showcases" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "banners" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "carts" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "carts.items" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops.days_of_work" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops.holidays" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "orders" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "delivery_methods" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "chats" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "chats.messages" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "blogs" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "blogs.articles" }, actions: ["insert", "find", "update", "remove"] },
  ], 
  roles: []
});
db.createRole({
  role: "dataAnalytist",
  privileges: [
    { resource: { db: appDatabase, collection: "users" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "property_names" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "property_values" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "features" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "products" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "products.properties" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "categories" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "carts" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "carts.items" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "shops.days_of_work" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "shops.holidays" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "orders" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "delivery_methods" }, actions: ["find"] }
  ], 
  roles: []
});
db.createRole({
  role: "contentManager",
  privileges: [
    { resource: { db: appDatabase, collection: "property_names" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "property_values" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "features" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "products" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "products.properties" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "showcases" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "banners" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "categories" }, actions: ["insert", "find", "update"] },
    { resource: { db: appDatabase, collection: "carts" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "carts.items" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops.days_of_work" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops.holidays" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "blogs" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "blogs.articles" }, actions: ["insert", "find", "update", "remove"] }
  ], 
  roles: []
});
db.createRole({
  role: "support",
  privileges: [
    { resource: { db: appDatabase, collection: "users" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "property_names" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "property_values" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "features" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "products" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "products.properties" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "categories" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "carts" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "carts.items" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops.days_of_work" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops.holidays" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "orders" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "delivery_methods" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "chats" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "chats.messages" }, actions: ["insert", "find", "update", "remove"] }
  ], 
  roles: []
});
db.createRole({
  role: "shipper",
  privileges: [
    { resource: { db: appDatabase, collection: "property_names" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "property_values" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "features" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "products" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "products.properties" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "categories" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "showcases" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "banners" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "carts" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "carts.items" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "shops.days_of_work" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "shops.holidays" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "orders" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "delivery_methods" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "chats" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "chats.messages" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "blogs" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "blogs.articles" }, actions: ["find"] },
  ],
  roles: []
});
db.createRole({
  role: "customer",
  privileges: [
    { resource: { db: appDatabase, collection: "property_names" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "property_values" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "features" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "products" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "products.properties" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "categories" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "showcases" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "banners" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "carts" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "carts.items" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "shops" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "shops.days_of_work" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "shops.holidays" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "orders" }, actions: ["insert", "find", "update", "remove"] },
    { resource: { db: appDatabase, collection: "delivery_methods" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "chats" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "chats.messages" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "blogs" }, actions: ["find"] },
    { resource: { db: appDatabase, collection: "blogs.articles" }, actions: ["find"] }
  ], 
  roles: []
});
db.log.insertOne({ "message": "Database structure has been created." });