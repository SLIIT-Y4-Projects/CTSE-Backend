const Review = require("../models/Review");
const reviewCreateSchema = require("../validations/reviewCreate.validation");

const reviewController = {
  // create review
  createReview: async (req, res) => {
    try {
      const { product, rating, comment } = req.body;
      const buyer = req.userId;

      // validation
      reviewCreateSchema.parse(req.body);

      const newReview = new Review({
        buyer,
        product,
        rating,
        comment,
      });

      const savedReview = await newReview.save();

      //TODO: update product stock - send event to product service

      res.status(201).json({
        success: true,
        review: savedReview,
        message: "Review created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all reviews
  getReviews: async (req, res) => {
    try {
      const reviews = await Review.find()
        .populate("buyer", "name email")
        .populate("product", "name price");

      res.status(200).json({ success: true, reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get review by id
  getReviewById: async (req, res) => {
    try {
      const reviewId = req.params.id;
      const review = await Review.findById(reviewId)
        .populate("buyer", "name email")
        .populate("product", "name price");

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      res.status(200).json({ success: true, review });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update review
  updateReview: async (req, res) => {
    try {
      const reviewId = req.params.id;
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
        new: true,
      })
        .populate("buyer", "name email")
        .populate("product", "name price");

      res.status(200).json({
        success: true,
        review: updatedReview,
        message: "Review updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete review
  deleteReview: async (req, res) => {
    try {
      const reviewId = req.params.id;

      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      const deletedReview = await Review.findByIdAndDelete(reviewId)
        .populate("buyer", "name email")
        .populate("product", "name price");

      res.status(200).json({
        success: true,
        review: deletedReview,
        message: "Review deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get reviews count using aggregation
  getReviewsCount: async (req, res) => {
    try {
      const reviewsCount = await Review.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, count: reviewsCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = reviewController;
