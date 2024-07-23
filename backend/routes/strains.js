const express = require('express');

const router = express.Router();
const strainsController = require('../controllers/strainsController');

// Get Strain by ID
router.get('/getStrainsById/:strainID', strainsController.getStrainById);

// Get Strains by Name
router.get('/getStrainsByName/:strainName', strainsController.getStrainByName);


// Get Strains by Type
router.get('/getStrainsByType/:strainType', strainsController.getStrainsByType);

// Get Strains by Effects
router.get('/getStrainsByEffect/:strainEffect', strainsController.getStrainsByEffect);

// Get Strains by Flavours
router.get('/getStrainsByFlavour/:strainFlavour', strainsController.getStrainsByFlavour);

// Get All Flavors
router.get('/getAllFlavors', strainsController.getAllFlavors);

// Get All Types
router.get('/getAllTypes', strainsController.getAllTypes);

// Get All Effects
router.get('/getAllEffects', strainsController.getAllEffects);

// Get Strains By Effects and Flavors 
router.post('/getStrainsByEffectFlavor/', strainsController.getStrainsByEffectFlavour)

// Get Similiar Strains
// router.get('/getSimiliarStrains/:strainValues', strainsController.getSimiliarStrains);

module.exports = router;