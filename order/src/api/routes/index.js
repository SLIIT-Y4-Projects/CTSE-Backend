import { Router } from "express";
import controller from "../controllers";
// import middleware from "../middleware";

const router = Router();

// Root API Call
// router.get("/", (req, res, next) => {
// 	res.send("Order API");
// 	next();
// });

// Order Endpoints
router.post("/", controller.addOrder); // insert one order
// TODO: Get all orders
router.get("/", controller.getOrders); // get all orders

router.patch("/paid/:orderId", controller.changeOrderIsPaidStatus); // change order isPaid status
router.patch("/status/:orderId", controller.changeOrderStatus); // change order status
router.get("/:orderId", controller.getOrder); // get one order

// TODO: Update a order
// Delete a order
router.delete("/:orderId", controller.deleteOrder); // delete one order

export default router;
