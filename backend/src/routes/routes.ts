import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { Wishlist } from "../controllers/WishlistController";
const router = Router();
/*
router.post("/signup", UserController.signUp);
router.get("/user/:id", UserController.readUser);
router.get("/users", UserController.readAllUsers);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

router.get("/user/:id/wishlist", Wishlist.readWishlist);
router.put("/user/:id/wishlist", Wishlist.updateWishlist);
router.put("/user/:id/wishlist/add", Wishlist.updateWishlist);
*/

export default router