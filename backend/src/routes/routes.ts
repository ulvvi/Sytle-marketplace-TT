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
import { saleController } from "../controllers/saleController";

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
router.post("/cart/:userId", 
    authenticateJWT,
    ensureOwner,
    cartController.addVariantToCart);
router.delete("/cart/:userId", 
    authenticateJWT,
    ensureOwner,
    cartController.removeVariant);
router.get("/cart/:userId", 
    authenticateJWT,
    ensureOwner,
    cartController.getCart);

// Order router
router.post("/order/:userId", 
    authenticateJWT,
    ensureOwner,
    orderController.createOrder);
router.get("/order/:userId",
    authenticateJWT,
    ensureOwner,
    orderController.getUserOrders);
router.put("/order/:orderId",
    orderController.updateSituation)

//usuario
router.post("/signUp", 
    validateRequestBody(userValidation.signUpVal),
    UserController.signUp);
router.post("/signIn", 
    validateRequestBody(userValidation.signInVal), 
    UserController.signIn);
router.get("/user/:userId",
    validateRequestParams(ValidateSchemaParams.getUserId),
    authenticateJWT, 
    ensureOwner, 
    UserController.readUser);
router.get("/users", 
    UserController.readAllUsers); //rota mais pra debbug
router.put("/user/:userId", 
    validateRequestParams(ValidateSchemaParams.getUserId),
    validateRequestBody(userValidation.updateUserVal),
    authenticateJWT, 
    ensureOwner, 
    UserController.updateUser);
router.delete("/user/:userId",
    validateRequestParams(ValidateSchemaParams.getUserId),
    authenticateJWT, 
    ensureOwner, 
    UserController.deleteUser);

//wishlist
router.get("/user/:userId/wishlist",
    validateRequestParams(ValidateSchemaParams.getUserId),
    authenticateJWT, 
    ensureOwner, 
    Wishlist.readWishlist);
router.put("/user/:userId/wishlist/add",
    validateRequestParams(ValidateSchemaParams.getUserId),
    validateRequestBody(wishlistValidation.addWishlistVal),
    authenticateJWT, 
    ensureOwner, 
    Wishlist.addToWishlist);
router.put("/user/:userId/wishlist/del",
    validateRequestParams(ValidateSchemaParams.getUserId),
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

//sale router
router.post("/sale", saleController.createSale);
router.put("/sale/:saleId/addProducts", saleController.addProductsToSale);
router.delete("/sale/:saleId", saleController.deleteSale);


export default router;
