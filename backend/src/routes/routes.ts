import { Router } from "express";
import { productController } from "../controllers/productController";
import { variantController } from "../controllers/variant.Controller";
import { reviewController } from "../controllers/reviewController";

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

export default router;
