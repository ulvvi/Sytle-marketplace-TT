import { Router } from "express";
import { productController } from "../controllers/productController";
import { variantController } from "../controllers/variant.Controller";
import { reviewController } from "../controllers/reviewController";
import { UserController } from "../controllers/UserController";
import { Wishlist } from "../controllers/WishlistController";
import { authenticateJWT, ensureOwner } from "../middlewares/authMiddleware";
import userValidation from "../middlewares/userValidation";
import { validateRequestBody } from "../middlewares/ValidateSchemaBody";
import ValidadeSchemaParams, { validateRequestParams } from "../middlewares/ValidadeSchemaParams";
import wishlistValidation from "../middlewares/wishlistValidation";
import productValidation from "../middlewares/productValidation";
import variantValidation from "../middlewares/variantValidation";

const router = Router();

// Rota do produto
router.post("/product", 
    validateRequestBody(productValidation.createProductVal),
    productController.createProduct);
router.get("/products", productController.readAllProduct);
router.get("/product/:id",
    validateRequestParams(ValidadeSchemaParams.getSelfId),
    productController.readProduct);
router.put("/product/:id", 
    validateRequestParams(ValidadeSchemaParams.getSelfId),
    validateRequestBody(productValidation.updateProductVal),
    productController.updateProduct);
router.delete("/product/:id", 
    validateRequestParams(ValidadeSchemaParams.getSelfId),
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
    validateRequestParams(ValidadeSchemaParams.getSelfId),
    variantController.readVariant);
router.put("/variant/:id", 
    validateRequestParams(ValidadeSchemaParams.getSelfId),
    validateRequestBody(variantValidation.updateVariantVal),
    variantController.updateVariant);
router.delete("/variant/:id", 
    validateRequestParams(ValidadeSchemaParams.getSelfId),
    variantController.deleteVariant);

// Rota da review
router.post("/review/:productId", reviewController.createReview);
router.get("/reviews/:productId", reviewController.readAllReview); // Retorna todos os reviews de um produto
router.get("/review/:id", reviewController.readReview);
router.put("/review/:id", reviewController.updateReview);
router.delete("/review/:id", reviewController.deleteReview);

//usuario
router.post("/signUp", 
    validateRequestBody(userValidation.signUpVal),
    UserController.signUp);
router.post("/signIn", 
    validateRequestBody(userValidation.signInVal), 
    UserController.signIn);
router.get("/user/:id",
    validateRequestParams(ValidadeSchemaParams.getSelfId),
    authenticateJWT, 
    ensureOwner, 
    UserController.readUser);
router.get("/users", 
    UserController.readAllUsers); //rota mais pra debbug
router.put("/user/:id", 
    validateRequestParams(ValidadeSchemaParams.getSelfId),
    validateRequestBody(userValidation.updateUserVal),
    authenticateJWT, 
    ensureOwner, 
    UserController.updateUser);
router.delete("/user/:id",
    validateRequestParams(ValidadeSchemaParams.getSelfId),
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


export default router;