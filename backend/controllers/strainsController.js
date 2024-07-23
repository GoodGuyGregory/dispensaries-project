const { $where } = require('../models/dispenseryModel');
const Strain = require('../models/strainModel');

// Get Strain by ID
const getStrainById = (req, res) => {
  const objectId = req.params.strainID;
  Strain.findOne({ _id: objectId })
    .then((result) => {
      if (result) {
        return res.json(result);
      } else {
        return res.status(404).send('Strain not found');
      }
    })
    .catch((err) => {
      console.log('Error finding strain:', err);
      return res.status(500).send('Error finding strain');
    });
};

// Get Strain by Name
const getStrainByName = (req, res) => {
  const strain_name = req.params.strainName;
  Strain.findOne({ Strain : strain_name })
    .then((result) => {
      if (result) {
        return res.json(result);
      } else {
        return res.status(404).send('Strain not found');
      }
    })
    .catch((err) => {
      console.log('Error finding strain:', err);
      return res.status(500).send('Error finding strain');
    });
};

// Get Effects by ID
const getEffectsById = (req, res) => {
  const objectId = req.params.strainID;
  Strain.findOne({ _id: objectId })
    .then((result) => {
      if (result) {
        return res.json(result.Effects);
      } else {
        return res.status(404).send('Strain not found');
      }
    })
    .catch((err) => {
      console.log('Error finding strain:', err);
      return res.status(500).send('Error finding strain');
    });
};

// Get Flavours by ID
const getFlavorsByID = (req, res) => {
  const objectId = req.params.strainID;
  Strain.findOne({ _id: objectId })
      .then((result) => {
        if (result) {
          return res.json(
            {
              _id: res._id,
              Name: result.Name,
              Flavors: result.Flavor
            }
            );
        } else {
          return res.status(404).send('Strain not found');
        }
      })
      .catch((err) => {
        console.log('Error finding strain:', err);
        return res.status(500).send('Error finding strain');
    });
}

// Get all Flavours
const getAllFlavors = (req, res) => {
  Strain.find()
    .distinct('Flavor')
    .then((flavors) => {
      if (flavors && flavors.length > 0) {
        return res.json(flavors);
      } else {
        return res.status(404).send('No flavors found');
      }
    })
    .catch((err) => {
      console.log('Error retrieving flavors:', err);
      return res.status(500).send('Error retrieving flavors');
    });
};

// Get all Effects 
const getAllEffects = (req, res) => {
  Strain.find()
    .distinct('Effects')
    .then((effects) => {
      if (effects && effects.length > 0) {
        return res.json(effects);
      } else {
        return res.status(404).send('No effects found');
      }
    })
    .catch((err) => {
      console.log('Error retrieving effects:', err);
      return res.status(500).send('Error retrieving effects');
    });
};

// Get all Types 
const getAllTypes = (req, res) => {
  Strain.find()
    .distinct('Type')
    .then((types) => {
      if (types && types.length > 0) {
        return res.json(types);
      } else {
        return res.status(404).send('No Types found');
      }
    })
    .catch((err) => {
      console.log('Error retrieving types of cannabis:', err);
      return res.status(500).send('Error retrieving types of cannabis');
    });
};


// get Strains by Type
const getStrainsByType = (req, res) => {
  const strain_type = req.params.strainType;
  Strain.find({ Type : strain_type })
    .then((result) => {
      if (result) {
        return res.json(result);
      } else {
        return res.status(404).send('Strain not found');
      }
    })
    .catch((err) => {
      console.log('Error finding strain:', err);
      return res.status(500).send('Error finding strain');
    });
};

// get Strains by Effect
const getStrainsByEffect = (req, res) => {
  const strain_effects = req.params.strainEffect;
  Strain.find({ Effects : strain_effects })
    .then((result) => {
      if (result) {
        return res.json(result);
      } else {
        return res.status(404).send('Strain not found');
      }
    })
    .catch((err) => {
      console.log('Error finding strain:', err);
      return res.status(500).send('Error finding strain');
    });
};

// get Strains by Flavour
const getStrainsByFlavour = (req, res) => {
  const strain_flavours = req.params.strainFlavour;
  Strain.find({ Flavor : strain_flavours })
    .then((result) => {
      if (result) {
        return res.json(result);
      } else {
        return res.status(404).send('Strain not found');
      }
    })
    .catch((err) => {
      console.log('Error finding strain:', err);
      return res.status(500).send('Error finding strain');
    });
};

const getStrainsByEffectFlavour = async (req, res) => {
  const strain_effect = req.body.strainEffect;
  const strain_flavor = req.body.strainFlavor;
  const minRating = req.body.minRating;
  const strainType = req.body.strainType;

  let strains = await Strain.find(
    { 
      Effects : { $in: [strain_effect] }, 
      Flavor: { $in: [strain_flavor]},
      Rating: { $gte: minRating },
      Type: { $eq: strainType}
    });
  
  if (strains) {
    return res.status(200).send(strains);
  }
  
  else {
    console.log(`No Strains Found`);
    return res.status(200);
  }
}

module.exports = {
  getStrainById,
  getStrainByName,
  getEffectsById,
  getFlavorsByID,
  getAllTypes,
  getAllFlavors,
  getAllEffects,
  getStrainsByType,
  getStrainsByFlavour,
  getStrainsByEffect,
  getStrainsByEffectFlavour
  // getSimiliarStrains,
};