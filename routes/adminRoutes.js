const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminHandler = require('../handlers/adminHandler');

const listUsers    = adminHandler.listUsers;
const listCertifs  = adminHandler.listCertifs;
const listComments = adminHandler.listComments;
const addUser      = adminHandler.addUser;
const updateUser   = adminHandler.updateUser;
const deleteUser   = adminHandler.deleteUser;

router.get('/users',       authMiddleware, asyncHandler(listUsers));
router.get('/certifs',     authMiddleware, asyncHandler(listCertifs));
router.get('/comments',    authMiddleware, asyncHandler(listComments));
router.get('/add_user',    authMiddleware, asyncHandler(addUser));
router.get('/upd_user/:id',authMiddleware, asyncHandler(updateUser));
router.get('/del_user/:id',authMiddleware, asyncHandler(deleteUser));

module.exports = router;