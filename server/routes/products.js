const router = require('express').Router();
const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('./verifyToken'); // If you don't have this, use verifyToken and check isAdmin inside

// 1. CREATE PRODUCT (Admin)
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) { res.status(500).json(err); }
});

// 2. GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) { res.status(500).json(err); }
});

// 3. GET SINGLE PRODUCT
router.get('/find/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) { res.status(500).json(err); }
});

// 4. DELETE PRODUCT (Admin)
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted...");
  } catch (err) { res.status(500).json(err); }
});

// 5. ADD REVIEW
router.post('/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
      user: req.body.user, // User ID
    };

    product.reviews.push(review);
    
    // Recalculate Rating
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json(product); // <--- CRITICAL: Returns the Updated Product
  } catch (err) {
    res.status(500).json(err);
  }
});

// 6. DELETE REVIEW (Admin Only)
router.delete('/:id/reviews/:reviewId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Filter out the review to delete
    product.reviews = product.reviews.filter(r => r._id.toString() !== req.params.reviewId);

    // Recalculate Rating
    product.numReviews = product.reviews.length;
    product.rating = product.numReviews === 0 ? 0 : product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(200).json(product); // Return updated product
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;