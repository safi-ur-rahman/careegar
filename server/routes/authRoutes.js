const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, getProfile, getCarOwnerProfile, getSupplierProfile,
   getMechanicProfile, getCustomizerProfile, logoutUser, carownerProfile, supplierProfile,
    mechanicProfile, customizerProfile, searchUsers, searchProducts, searchServices, getProducts, 
    addProduct, deleteProduct, getStoreProducts, editProduct, addService, getWorkshopServices, 
    editService, deleteService, workshopDetails, getWorkshopDetails, 
    setWorkshopExperience, getService, getProfilebyId, bookService,
    getBookings, getUser, updateBooking, getUserBookings, getProductById, getCartProducts, 
    addToCart, removeFromCart, getSupplierStore, 
    getSupplierInfo } = require('../controllers/authControllers');
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
        origin: 'http://localhost:5173'
    })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)


router.get('/profile', getProfile)
router.get('/carOwnerProfile', getCarOwnerProfile)
router.get('/supplierProfile', getSupplierProfile)
router.get('/mechanicProfile', getMechanicProfile)
router.get('/customizerProfile', getCustomizerProfile)
router.get('/getProfile/:id', getProfilebyId)
router.get('/getUser/:id', getUser);

router.post('/carownerProfileModal', upload.single('image'), carownerProfile)
router.post('/supplierProfileModal', upload.single('image'), supplierProfile)
router.post('/mechanicProfileModal', upload.single('image'), mechanicProfile)
router.post('/customizerProfileModal', upload.single('image'), customizerProfile)

router.get('/searchUsers', searchUsers)
router.get('/searchProducts', searchProducts);
router.get('/searchServices', searchServices);

router.post('/addProduct', upload.array('images', 10), addProduct);
router.get('/storeProducts', getStoreProducts)
router.put('/editProduct', editProduct)
router.delete('/deleteProduct/:productId', deleteProduct);
router.get('/getProducts', getProducts)
router.get('/getProductById/:id', getProductById);

router.post('/addService', upload.array('images', 10), addService);
router.get('/workshopServices/:mechanicId', getWorkshopServices)
router.put('/editService', editService)
router.delete('/deleteService/:id', deleteService)
router.get('/getService/:id', getService)

router.post('/workshopDetails', workshopDetails)
router.get('/getWorkshopDetails/:mechanicId', getWorkshopDetails)
router.post('/setWorkshopExperience', setWorkshopExperience)

router.post('/bookService', upload.array('images', 10), bookService)
router.get('/getBookings/:mechanicId', getBookings)
router.put('/updateBooking/:id', updateBooking)
router.get('/userBookings/:userId', getUserBookings)

router.get('/getCartProducts', getCartProducts)
router.post('/addToCart', addToCart);
router.delete('/removeFromCart/:productId', removeFromCart);
router.get('/getSupplierInfo', getSupplierInfo);
router.get('/getSupplierproducts', getSupplierStore);

module.exports = router