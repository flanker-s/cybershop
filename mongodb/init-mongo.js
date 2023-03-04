const user = process.env.MONGO_INITDB_USERNAME;
const pwd = process.env.MONGO_INITDB_PASSWORD;
const appDatabase = process.env.MONGO_INITDB_DATABASE;
//Create the admin
db.createUser(
  {
    user: user,
    pwd: pwd,
    roles: [
      { role: "readWrite", db: appDatabase },
    ],
  }
);
//Create roles
const rolesResult = db.roles.insertMany([
  { name: "admin" },
  { name: "analytist" },
  { name: "contentManager" },
  { name: "shiper" },
  { name: "support" },
  { name: "customer" },
]);
//Create users
db.createCollection("users");
//Create tokens
db.createCollection("tokens");
//Create banners
db.banners.insertOne({
  name: "Example banner",
  img: "./example/some-image.img",
  url: "https://your-internal-page",
  template: "./example/some-template.tsx"
});
//Create value lists
const values = [
  { _id: ObjectId(), value: "black" }, 
  { _id: ObjectId(), value: "white" }, 
  { _id: ObjectId(), value: "gold" }, 
  { _id: ObjectId(), value: "red" },
  { _id: ObjectId(), value: "blue" },
];
const valueListResult = db.valueLists.insertOne({
  name: "colors",
  values: values
});
//Create categories
const attributes = [
  {
    _id: ObjectId(),
    name: "Contents",
    type: "string"
  },
  {
    _id: ObjectId(),
    name: "Color",
    type: "reference",
    reference: valueListResult.insertedId
  }
];
const categoryResult = db.categories.insertOne({
  name: "Products are pending for editing",
  categoryBanners: [],
  features: [{
    name: "Example feature",
    attributes: attributes
  }]
});
//Create products
const productResult = db.products.insertOne({
  name: "Example product",
  values: [
    {
      attributeId: attributes[0]._id,
      value: "USB power adapter, USB Cable, Quick Start Guide"
    },
    {
      attributeId: attributes[1]._id,
      value: values[0]._id
    }
  ],
  review: {
    name: "Title related to product",
    text: "Product info",
  },
  categoryId: categoryResult.insertedId
});
//Create showcases
db.showcases.insertOne({
  name: "Example template name",
  productIds: [productResult.insertedId],
  template: "./example/some-template.tsx"
});
//Create shops
db.shops.insertOne({
  name: "Example shop. That's contact info that represent a shop from a real world.(Who knows what's real)",
  daysOfWork: [
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
db.createCollection("deliveryMethods");
db.createCollection("paymentMethods");
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
  img: "./example/img.url",
  url: "https://example/url",
  description: "Sale summary"
});
db.logs.insertOne({ level: "INFO", message: "Database structure has been created." });