import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { Wishlist } from "../controllers/WishlistController";
import { authenticateJWT, ensureOwner } from "../middlewares/authMiddleware";

const router = Router();

//usuario
router.post("/signUp", UserController.signUp);
router.post("/signIn", UserController.signIn);
router.get("/user/:id",
    authenticateJWT, 
    ensureOwner, 
    UserController.readUser);
router.get("/users", 
    UserController.readAllUsers); //rota mais pra debbug
router.put("/user/:id", 
    authenticateJWT, 
    ensureOwner, 
    UserController.updateUser);
router.delete("/user/:id",
    authenticateJWT, 
    ensureOwner, 
    UserController.deleteUser);

//wishlist
router.get("/user/:id/wishlist",
    authenticateJWT, 
    ensureOwner, 
    Wishlist.readWishlist);
router.put("/user/:id/wishlist",
    authenticateJWT, 
    ensureOwner, 
    Wishlist.updateWishlist);
router.put("/user/:id/wishlist/add",
    authenticateJWT, 
    ensureOwner, 
    Wishlist.updateWishlist);


export default router