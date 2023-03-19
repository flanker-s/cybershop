import express from 'express';
import controller from '../../controllers/Product/ProductComment.js';

const router = express.Router({ mergeParams: true });

router.post('/create', controller.createProductComment);
router.get('/get/:variablenameId', controller.readProductComment);
router.get('/get', controller.readAllProductCommentItems);
router.patch('/update/:variablenameId', controller.updateProductComment);
router.delete('/delete/:variablenameId', controller.deleteProductComment);

export default router;