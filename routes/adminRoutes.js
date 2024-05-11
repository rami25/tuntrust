const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminHandler = require('../handlers/adminHandler');

const listUsers    = adminHandler.listUsers;
const listCertifs  = adminHandler.listCertifs;
const listdCertifs  = adminHandler.listdCertifs;
const listComments = adminHandler.listComments;
const addUser      = adminHandler.addUser;
const updateUser   = adminHandler.updateUser;
const deleteUser   = adminHandler.deleteUser;
const ansCertif   = adminHandler.ansCertif;

router.get('/users',       authMiddleware, asyncHandler(listUsers));
router.post('/add_user',    authMiddleware, asyncHandler(addUser));
router.patch('/upd_user/:id',authMiddleware, asyncHandler(updateUser));
router.delete('/del_user/:id',authMiddleware, asyncHandler(deleteUser));
router.get('/certifs',     authMiddleware, asyncHandler(listCertifs));
router.get('/done-certifs',     authMiddleware, asyncHandler(listdCertifs));
router.get('/comments',    authMiddleware, asyncHandler(listComments));
router.post('/certif', authMiddleware, asyncHandler(ansCertif));

module.exports = router;