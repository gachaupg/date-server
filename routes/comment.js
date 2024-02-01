import express from 'express';
import { addReply, createComment, getComments, deleteReply } from '../controllers/Comments.js';


const router = express.Router();

router.post('/:postId', createComment);

router.get('/:postId/comments', getComments);

router.put('/:commentId', addReply)

router.delete('/:commentId/replies/:replyId', deleteReply)


export default router;