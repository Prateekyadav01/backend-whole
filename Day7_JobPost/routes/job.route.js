import {Router} from 'express'
import { allPost, blogPost, deletePost, filterPost, singlePost, updatePost } from '../controller/blog.controller.js';
import { accessTokenGet } from '../middleware/Token.middleware.js';
import { jobPost } from '../controller/job.controller.js';




const router = Router();


router.route('/newBlog').post(accessTokenGet,jobPost);
router.route('/getALLBlog').get(accessTokenGet,allPost);
router.route('/singleBlog/:id').get(singlePost);
router.route('/deleteBlog/:id').delete(accessTokenGet,deletePost);
router.route('/updateBlog/:id').patch(accessTokenGet,updatePost);
router.route('/filterBlog/').get(accessTokenGet,filterPost);

export default router;
