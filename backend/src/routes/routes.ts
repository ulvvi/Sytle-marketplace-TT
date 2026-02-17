import { Router } from "express";
import { productController } from "../controllers/productController";
import { variantController } from "../controllers/variant.Controller";
import { reviewController } from "../controllers/reviewController";
import { UserController } from "../controllers/UserController";
import { Wishlist } from "../controllers/WishlistController";
import { authenticateJWT, ensureOwner } from "../middlewares/authMiddleware";
import { categoryController } from "../controllers/categoryController";
import { cartController } from "../controllers/cartController";
import { orderController } from "../controllers/orderController";

import userValidation from "../middlewares/userValidation";
import { validateRequestBody } from "../middlewares/ValidateSchemaBody";
import ValidateSchemaParams, { validateRequestParams } from "../middlewares/ValidateSchemaParams";
import wishlistValidation from "../middlewares/wishlistValidation";
import productValidation from "../middlewares/productValidation";
import variantValidation from "../middlewares/variantValidation";
import reviewValidation from "../middlewares/reviewValidation";

const router = Router();

// Rota do produto
router.post("/product", 
    validateRequestBody(productValidation.createProductVal),
    productController.createProduct);
router.get("/products", productController.readAllProduct);
router.get("/product/:id",
    validateRequestParams(ValidateSchemaParams.getSelfId),
    productController.readProduct);
router.put("/product/:id", 
    validateRequestParams(ValidateSchemaParams.getSelfId),
    validateRequestBody(productValidation.updateProductVal),
    productController.updateProduct);
router.delete("/product/:id", 
    validateRequestParams(ValidateSchemaParams.getSelfId),
    productController.deleteProduct);

// Rota da variante
router.post("/variant/:productId",
    validateRequestParams(variantValidation.getProductId),
    validateRequestBody(variantValidation.createVariantVal),
    variantController.createVariant);
router.get("/variants/:productId", 
   validateRequestParams(variantValidation.getProductId),
    variantController.readAllVariant); // Retorna todas as variantes de um produto
router.get("/variant/:id", 
    validateRequestParams(ValidateSchemaParams.getSelfId),
    variantController.readVariant);
router.put("/variant/:id", 
    validateRequestParams(ValidateSchemaParams.getSelfId),
    validateRequestBody(variantValidation.updateVariantVal),
    variantController.updateVariant);
router.delete("/variant/:id", 
    validateRequestParams(ValidateSchemaParams.getSelfId),
    variantController.deleteVariant);

// Rota da review
router.post("/review/:productId",
    validateRequestParams(reviewValidation.getProductId),
    validateRequestBody(reviewValidation.createReviewVal),
    reviewController.createReview);
router.get("/reviews/:productId", 
    validateRequestParams(reviewValidation.getProductId),
    reviewController.readAllReview); // Retorna todos os reviews de um produto
router.get("/review/:id", 
    validateRequestParams(ValidateSchemaParams.getSelfId),
    reviewController.readReview);
router.put("/review/:id", 
    validateRequestParams(ValidateSchemaParams.getSelfId),
    validateRequestBody(reviewValidation.updateReviewVal),
    reviewController.updateReview);
router.delete("/review/:id", 
    validateRequestParams(ValidateSchemaParams.getSelfId),
    reviewController.deleteReview);

// Cart router
router.post("/cart/:userId", cartController.addVariantToCart);
router.delete("/cart/:userId", cartController.removeVariant);
router.get("/cart/:userId", cartController.getCart);

// Order router
router.post("/order/:userId", orderController.createOrder);

//usuario
router.post("/signUp", 
    validateRequestBody(userValidation.signUpVal),
    UserController.signUp);
router.post("/signIn", 
    validateRequestBody(userValidation.signInVal), 
    UserController.signIn);
router.get("/user/:id",
    validateRequestParams(ValidateSchemaParams.getSelfId),
    authenticateJWT, 
    ensureOwner, 
    UserController.readUser);
router.get("/users", 
    UserController.readAllUsers); //rota mais pra debbug
router.put("/user/:id", 
    validateRequestParams(ValidateSchemaParams.getSelfId),
    validateRequestBody(userValidation.updateUserVal),
    authenticateJWT, 
    ensureOwner, 
    UserController.updateUser);
router.delete("/user/:id",
    validateRequestParams(ValidateSchemaParams.getSelfId),
    authenticateJWT, 
    ensureOwner, 
    UserController.deleteUser);

//wishlist
router.get("/user/:id/wishlist",
    validateRequestParams(wishlistValidation.getUserId),
    authenticateJWT, 
    ensureOwner, 
    Wishlist.readWishlist);
router.put("/user/:id/wishlist/add",
    validateRequestParams(wishlistValidation.getUserId),
    validateRequestBody(wishlistValidation.addWishlistVal),
    authenticateJWT, 
    ensureOwner, 
    Wishlist.addToWishlist);
router.put("/user/:id/wishlist/del",
    validateRequestParams(wishlistValidation.getUserId),
    validateRequestBody(wishlistValidation.delWishlistVal),
    authenticateJWT, 
    ensureOwner, 
    Wishlist.DelFromWishlist);

// Rota do produto
router.post("/category", categoryController.createCategory);
router.post("/category/:categoryId/product/:productId", categoryController.addToCategory)
router.get("/categories", categoryController.readAllCategories);
router.get("/category/:id", categoryController.readCategory);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);
router.delete("/category/:categoryId/product/:productId", categoryController.delFromCategory)


export default router;
