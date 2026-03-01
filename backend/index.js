const port = 4100;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

// Create upload folder if it doesn't exist
const dir = './upload/images';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Database connection
mongoose.connect("mongodb+srv://elqarniasamah:elqarniasamah@cluster0.p2g75f7.mongodb.net/?appName=Cluster0").then(() => console.log("MongoDB connected successfully")).catch(err => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

// Static folder
app.use('/images', express.static('./upload/images'));

// Upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// // schema for creating products
const Product = mongoose.model("Product", new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
  slug: {
    type: String,
  },
  sku: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  stock: {
    type: Number,
    default: 10,
  }
}, { timestamps: true }));
app.post('/addproduct', async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, error: "Failed to add product" });
  }
});

// creating API for deleting Products 
app.post('/removeproduct', async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
      success: true,
      name: req.body.name
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, error: "Failed to remove product" });
  }
});

// creating API for getting all products
app.get('/allproducts', async (req, res) => {
  try {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
});
const Users = mongoose.model('Users', new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  role: {
    type: String,
    enum: ['Customer', 'Admin'],
    default: 'Customer',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true }));
// Creating Endpoint for registering users
// Creating Endpoint for registering users
app.post('/signup', async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: false, error: "User already exists" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      cartData: cart,
    })
    await user.save();

    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
})
//creating endpoint for user login
app.post('/login', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email, isDeleted: false });
    if (user) {
      const bcrypt = require('bcryptjs');
      let passCompare = false;
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$')) {
        passCompare = await bcrypt.compare(req.body.password, user.password);
      } else {
        passCompare = req.body.password === user.password;
      }
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
            role: user.role
          }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token })
      }
      else {
        res.json({ success: false, error: "Wrong Password" })
      }
    }
    else {
      res.json({ success: false, error: "User not found" })
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
})
//creating endpoint for new collection data
app.get('/newcollectiond', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New Collection Fetched");
  res.send(newcollection);
})
//creating endpoint for popular products
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularinwomen = products.slice(0, 4);
  console.log("Popular in Women Fetched");
  res.send(popularinwomen);
})
// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid login" })
  }
  else {
    try {
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using valid login" })
    }
  }
}
//creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
})
//creating endpoint for removing products from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
  }
  else {
    res.send("Item not found in cart");
  }
})
//creating endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
})
// --- NEW DB MODELS ---
const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false },
  productNumId: { type: Number }, // added in case frontend passes the integer id instead
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});
const OrderItem = mongoose.model('OrderItem', OrderItemSchema);

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  shippingAddress: { type: Object },
  paymentMethod: { type: String }
}, { timestamps: true });
const Order = mongoose.model('Order', OrderSchema);

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Mongoose ID
  productNumId: { type: Number }, // To support the integer ID
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  isModerated: { type: Boolean, default: false }
}, { timestamps: true });
ReviewSchema.index({ user: 1, productNumId: 1 }, { unique: true });
const Review = mongoose.model('Review', ReviewSchema);

const fetchAdmin = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ errors: "Authenticate using valid login" });
  try {
    const data = jwt.verify(token, 'secret_ecom');
    if (data.user.role !== 'Admin') {
      return res.status(403).send({ errors: "Admin access required" });
    }
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Invalid token" });
  }
};

// --- NEW ENDPOINTS ---
app.post('/create-order', fetchUser, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
    let orderItemIds = [];
    if (items && items.length > 0) {
      for (const item of items) {
        const orderItem = new OrderItem({
          productNumId: item.productNumId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        });
        await orderItem.save();
        orderItemIds.push(orderItem._id);
      }
    }
    const order = new Order({
      user: req.user.id,
      items: orderItemIds,
      totalAmount,
      shippingAddress,
      paymentMethod
    });
    await order.save();

    let userData = await Users.findOne({ _id: req.user.id });
    if (userData && userData.cartData) {
      let emptyCart = {};
      for (let i = 0; i < 300; i++) emptyCart[i] = 0;
      await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: emptyCart });
    }

    res.json({ success: true, orderId: order._id });
  } catch (error) {
    res.status(500).json({ success: false, error: "Order creation failed" });
  }
});

app.get('/user-orders', fetchUser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: "Fetch orders failed" });
  }
});

app.get('/admin/orders', fetchAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('items').populate('user', 'name email');
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: "Could not fetch orders" });
  }
});

app.get('/admin/orders/:id', fetchAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items').populate('user', 'name email');
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: "Order not found" });
  }
});

app.post('/admin/orders/:id/status', fetchAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: "Update status failed" });
  }
});

app.post('/user/profile', fetchUser, async (req, res) => {
  try {
    const updated = await Users.findByIdAndUpdate(req.user.id, { name: req.body.name }, { new: true });
    res.json({ success: true, user: updated });
  } catch (e) {
    res.status(500).json({ success: false, error: "Profile update failed" });
  }
});

app.post('/user/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await Users.findOneAndUpdate({ email, isDeleted: false }, { password: hashedPassword });
    res.json({ success: true, message: "Password updated successfully" });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

app.post('/admin/users/:id/soft-delete', fetchAdmin, async (req, res) => {
  try {
    await Users.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

app.get('/admin/users', fetchAdmin, async (req, res) => {
  try {
    const users = await Users.find({ isDeleted: false }, '-password');
    res.json({ success: true, users });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

app.post('/product/:id/review', fetchUser, async (req, res) => {
  try {
    const { rating, comment, productNumId } = req.body;
    if (rating < 1 || rating > 5) return res.status(400).json({ success: false, error: "Invalid rating" });
    const review = new Review({ user: req.user.id, product: req.params.id, productNumId, rating, comment });
    await review.save();
    res.json({ success: true, review });
  } catch (e) {
    res.status(500).json({ success: false, error: e.code === 11000 ? "Review already exists" : "Failed to add review" });
  }
});

app.get('/product/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ $or: [{ product: req.params.id }, { productNumId: Number(req.params.id) }], isModerated: false }).populate('user', 'name');
    const total = reviews.length;
    const avg = total > 0 ? reviews.reduce((a, c) => a + c.rating, 0) / total : 0;
    res.json({ success: true, reviews, averageRating: avg, totalReviews: total });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

app.get('/products/search', async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;
    let filter = {};
    if (query) filter.name = { $regex: query, $options: 'i' };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.new_price = {};
      if (minPrice) filter.new_price.$gte = Number(minPrice);
      if (maxPrice) filter.new_price.$lte = Number(maxPrice);
    }
    let sortOpt = {};
    if (sort === 'price_asc') sortOpt.new_price = 1;
    if (sort === 'price_desc') sortOpt.new_price = -1;
    if (sort === 'newest') sortOpt.createdAt = -1;
    const skip = (page - 1) * limit;
    const products = await Product.find(filter).sort(sortOpt).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(filter);
    res.json({ success: true, products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (e) {
    res.status(500).json({ success: false, error: "Search failed" });
  }
});

app.get('/products/featured', async (req, res) => {
  try {
    const featured = await Product.find({ featured: true }).limit(10);
    res.json({ success: true, featured });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

app.get('/admin/analytics', fetchAdmin, async (req, res) => {
  try {
    const totalUsers = await Users.countDocuments({ isDeleted: false });
    const totalOrders = await Order.countDocuments();
    const revenueAgg = await Order.aggregate([
      { $match: { status: { $nin: ['Cancelled'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueAgg.length ? revenueAgg[0].total : 0;

    // Monthly revenue
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);
    const monthlyRevenueAgg = await Order.aggregate([
      { $match: { status: { $nin: ['Cancelled'] }, createdAt: { $gte: currentMonthStart } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const monthlyRevenue = monthlyRevenueAgg.length ? monthlyRevenueAgg[0].total : 0;

    const ordersByStatus = await Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);

    // Low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } }).select('name stock');

    // Best selling products
    const bestSellingAgg = await OrderItem.aggregate([
      { $group: { _id: '$productId', count: { $sum: '$quantity' } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' },
      { $project: { name: '$product.name', count: 1 } }
    ]);

    res.json({
      success: true,
      totalUsers,
      totalOrders,
      totalRevenue,
      monthlyRevenue,
      ordersByStatus,
      lowStockProducts,
      bestSellingProducts: bestSellingAgg
    });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

// Admin Review Moderation
app.post('/admin/reviews/:id/moderate', fetchAdmin, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isModerated: req.body.isModerated }, { new: true });
    res.json({ success: true, review });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

// Start server
app.listen(port, (error) => {
  if (!error) {
    console.log('Server running on port ' + port);
  } else {
    console.log('Error: ' + error);
  }
});
