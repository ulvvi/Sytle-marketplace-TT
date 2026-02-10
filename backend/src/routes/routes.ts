import { Router } from "express";
import { productController } from "../controllers/productController";
import { variantController } from "../controllers/variant.Controller";
import { reviewController } from "../controllers/reviewController";
import { UserController } from "../controllers/UserController";
import { Wishlist } from "../controllers/WishlistController";
import { authenticateJWT, ensureOwner } from "../middlewares/authMiddleware";

const router = Router();

// Rota do produto
router.post("/product", productController.createProduct);
router.get("/products", productController.readAllProduct);
router.get("/product/:id", productController.readProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

// Rota da variante
router.post("/variant/:productId", variantController.createVariant);
router.get("/variants/:productId", variantController.readAllVariant); // Retorna todas as variantes de um produto
router.get("/variant/:id", variantController.readVariant);
router.put("/variant/:id", variantController.updateVariant);
router.delete("/variant/:id", variantController.deleteVariant);

// Rota da review
router.post("/review/:productId", reviewController.createReview);
router.get("/reviews/:productId", reviewController.readAllReview); // Retorna todos os reviews de um produto
router.get("/review/:id", reviewController.readReview);
router.put("/review/:id", reviewController.updateReview);
router.delete("/review/:id", reviewController.deleteReview);

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
    Wishlist.addToWishlist);


export default router;