import { Router } from "express";
import controller from "../controllers";
//import middleware from "../middleware";

const router = Router();

// Root API Call
router.get("/", (req, res, next) => {
	res.send("Review API");
	next();
});

router.post("/sellerReview/", controller.insertSellerReview); // insert one seller review
router.get("/sellerReview/", controller.getAllSellerReviews); // get all seller reviews
router.get("/sellerReview/:id", controller.getOneSellerReview); // get one seller review
router.delete("/sellerReview/:id", controller.deleteSellerReview); // get one seller review

router.post("/productReview/", controller.insertProductReview); // insert one product review
router.get("/productReview/", controller.getAllProductReviews); // get all product reviews
router.get("/productReview/:id", controller.getOneProductReview); // get one product review

export default router;
