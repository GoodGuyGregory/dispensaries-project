const express = require('express');

const router = express.Router();
const dispensayController = require('../controllers/dispensariesController');


//get Dispensaries
// get Dispensary with Menu
// router.get('/get_menu', dispensayController.getSampleDispensaryMenu);

// get dispensary menu categories available
router.get('/categories', dispensayController.getDispensaryProductOptions)

// get dispensary states available
router.get('/regions', dispensayController.getStatesFromRegions);

// get Dispensary Product
router.post('/find_product_from_dispensaries', dispensayController.getDispenseriesWithProduct);

// get Dispensaries from Ids:
router.post('/find_dispensaries', dispensayController.getDispensaryIds);

router.get('/brands/:region',dispensayController.getDispensaryBrandOptions);

router.get('/dispensary/:id',dispensayController.getDispensary);

// Get Dispensaries with Menus by Region
// router.get('/getMenus/:page/:limit', dispensayController.getMenusPerRegion);


module.exports = router;
