const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, getProfile, getCarOwnerProfile, getSupplierProfile, getMechanicProfile, getCustomizerProfile, logoutUser, carownerProfile, supplierProfile, mechanicProfile, customizerProfile, searchUsers, searchProducts, addProduct, deleteProduct, getStoreProducts, editProduct } = require('../controllers/authControllers');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/dps/'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
      // Generate a unique filename
      if (file.originalname === 'defaultprofile.png') {
        cb(null, 'default-profile.png');
      } else {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
    }
  });
  
  const upload = multer({ storage: storage });

router.use(
    cors({
        credentials: true,
        origin: 'http://127.0.0.1:5173'
    })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/carOwnerProfile', getCarOwnerProfile)
router.get('/supplierProfile', getSupplierProfile)
router.get('/mechanicProfile', getMechanicProfile)
router.get('/customizerProfile', getCustomizerProfile)
router.post('/logout', logoutUser)
router.post('/carownerProfileModal', upload.single('image'), carownerProfile)
router.post('/supplierProfileModal', upload.single('image'), supplierProfile)
router.post('/mechanicProfileModal', upload.single('image'), mechanicProfile)
router.post('/customizerProfileModal', upload.single('image'), customizerProfile)
router.get('/searchUsers', searchUsers);
router.get('/searchProducts', searchProducts);
router.post('/addProduct', upload.array('images', 10), addProduct);
router.get('/storeProducts', getStoreProducts);
router.put('/editProduct', editProduct);
router.delete('/deleteProduct', deleteProduct);

module.exports = router