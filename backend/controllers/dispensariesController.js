const Dispensary = require('../models/dispenseryModel');
const Product = require('../models/productModel');

const getDispensaries= async (req, res, next) => {
    try {
        const totalCount = await Dispensary.countDocuments();
        console.log('Total number of documents in Dispensary collection:', totalCount);
        const dispensaries = await Dispensary.find({}, { Name: 1, Phone: 1, Address: 1, City: 1, Region: 1, Rating: 1 }).limit(10);
        
    
        return res.status(200).json({
            totalCount,
            dispensaries
        });
    } catch (err) {
        next(err);
    }
};

const getDispensary = async (req, res, next) => {
  const { id } = req.params
  try {
    const foundDispensary = await Dispensary.findById(id);
    res.status(200).json(foundDispensary);
  }
  catch (err) {
    next(err);
  }
  
}

const getStatesFromRegions = async (req, res, next) => {
  const foundRegions = await Dispensary.find().distinct('Region');

  res.send(foundRegions);
}



const buildProduct = (incomingProduct, dispensaryId, dispensaryName, dispensaryRegion, dispensaryRating) => {
    
    // Name:
    let nameRegex = /Name=([^,]+)/i;
    let foundName = incomingProduct.match(nameRegex);
    const productName = foundName[1];
    
    // Descripton:
    let descriptionRegex = /Description=(.*?)(?=, ImageUrl)/is;
    let foundDescription = incomingProduct.match(descriptionRegex);
    const descriptionFound = foundDescription[1];
    
    // StrainName
    let strainNameRegex = /StrainName=([^,]+)/i;
    let foundStrain = incomingProduct.match(strainNameRegex);
    let strainName = 'No Strain';
    if (foundStrain[1] !== 'null') {
      strainName = foundStrain[1];
    }
    

    //StrainType
    let strainTypeRegex = /StrainType=([^,]+)/i;
    let foundStrainType = incomingProduct.match(strainTypeRegex);
    let strainType = 'No Type';
    if (foundStrainType[1] !== 'null') {
      strainType = foundStrainType[1];
    }
    
    
    // // ImageUrl:
    let imageRegex = /ImageUrl=([^,]+)/i;;
    let foundImage = incomingProduct.match(imageRegex);
    const productImageUrl = foundImage[1];

    // // BrandName:
    let brandNameRegex = /BrandName=([^,]+)/i;
    let foundBrandName = incomingProduct.match(brandNameRegex);
    let brandname = foundBrandName[1];
    

    // // Category
    let categoryRegex = /Category=([^,]+)/i;
    let foundCategory = incomingProduct.match(categoryRegex);
    let category = foundCategory[1];

    // // BrandLogo:
    let brandLogoRegex = /brandlogo=([^,]+)/i;
    let uncutBrandLogo = incomingProduct.match(brandLogoRegex);
    let brandLogo = uncutBrandLogo[1];
    
    // Price:
    let priceRegex = /price=([^,]+)/i;
    let uncutPrice = incomingProduct.match(priceRegex);
    let price = uncutPrice[1];

    // StrainType:
    let strainRegex = /price=([^,]+)/i;
    let uncutStrainType = incomingProduct.match(strainRegex);
    let StrainType = uncutStrainType[1];

    // UnitSize:
    let unitSizeRegex = /unitsize=([^,]+)/i;
    let uncutUnitSize = incomingProduct.match(unitSizeRegex);
    let unitSize = uncutUnitSize[1];


    

    let prodResp = {
      DispensaryId: dispensaryId,
      DispensaryName: dispensaryName,
      State: dispensaryRegion,
      DispensaryRating: dispensaryRating,
      Name: productName,
      BrandName: brandname,
      StrainName: strainName,
      StrainType: strainType,
      Description: descriptionFound,
      ProductImage: productImageUrl,
      BrandLogo: brandLogo,
      Category: category,
      Price: price,
      UnitSize: unitSize

    }

    return prodResp;

}

const getDispensaryProductOptions = async (req, res) => {
    try {
      const dispensaries = await Dispensary.find({
        Menu: { $nin: ['[]', '[ \'[]\' ]'] }
          })
        .exec();
  
      const allCategories = new Set();
  
      for (const dispensary of dispensaries) {
        if (typeof dispensary.Menu === 'string') {
          const menuString = dispensary.Menu;
          const prodRegex = /{[^{}]+}/g;
          const foundObjects = menuString.match(prodRegex) || [];
  
          for (const product of foundObjects) {
            const categoryMatch = product.match(/Category=([^,]+)/i);
            if (categoryMatch && !/Category=Accessories/i.test(product)) {
              allCategories.add(categoryMatch[1].trim());
            }
          }
        }
      }
  
      const uniqueCategories = Array.from(allCategories);
      res.json(uniqueCategories);
    } catch (error) {
      console.error('Error fetching dispensary product options:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const getDispensaryBrandOptions = async (req, res) => {
    try {
      const dispensaries = await Dispensary.find({
        Menu: { $nin: ['[]', '[ \'[]\' ]'] }
          })
        .exec();
  
      const allBrands = new Set();
  
      for (const dispensary of dispensaries) {
        if (typeof dispensary.Menu === 'string') {
          const menuString = dispensary.Menu;
          const prodRegex = /{[^{}]+}/g;
          const foundObjects = menuString.match(prodRegex) || [];
  
          for (const product of foundObjects) {
            const brandMatch = product.match(/BrandName=([^,]+)/i);
            if (brandMatch && !/Category=Accessories/i.test(product)) {
              allBrands.add(brandMatch[1].trim());
            }
          }
        }
      }
  
      const uniqueBrands = Array.from(allBrands);
      res.json(uniqueBrands);
    } catch (error) {
      console.error('Error fetching dispensary product brand options:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


const getDispenseriesWithProduct = async (req, res) => {
    const name = req.body.Name;
    const brand = req.body.BrandName;
    const category = req.body.Category;
    const state  = req.body.State;
    const strainType = req.body.StrainType;
    const strainName = req.body.StrainName;

    let query = {
        Menu: { $ne: ["[]"] },
        Region: state  // Exclude documents where Menu is ["[]"]
    };


    if (!state) {
      res.status(400).json({
        message: "please supply a state for query"
      });
    }

    if (name) {
      query['Menu.0'] = { $ne: '[]' };  
      query['Menu'] = { 
          $elemMatch: { 
              $regex: name, 
              $options: 'i'
          }
      };
  }

    if (brand) {
      query['Menu.0'] = { $ne: '[]' };
      query['Menu'] = { 
          $regex: brand, 
          $options: 'i'
      };
    } 

    if (strainType) {
      query['Menu.0'] = { $ne: '[]' };
      query['Menu'] = { 
          $regex: strainType, 
          $options: 'i'
      };
    } 

    if (strainName) {
      query['Menu.0'] = { $ne: '[]' };
      query['Menu'] = { 
          $regex: strainName, 
          $options: 'i'
      };
    } 
    
    if (category) {
        query['Menu.0'] = { $ne: '[]' };
        query['Menu'] = { 
            $regex: category, 
            $options: 'i'
        };
    }
    else {
      res.status(400).json({
        message: "please supply a category parameter"
      });
    }


    
    // console.log('Query:', JSON.stringify(query, null, 2)); 


    try {
        const dispensaries = await Dispensary.find(query)
            .exec();
      // dispensaries contains the objects we are looking for. to pull the fields we 
      // will need to do some custom regex work.
        
      // object container for the response
      const dispensariesWithProduct = [];

        for (const dispensary of dispensaries) {

            const dispensaryMenu = dispensary['Menu'];
              // Pulls the Objects:
            // Regex to find the 
            // ({[^\{\}]+})* 
            const prodRegex = /{[^\{\}]+}* /g;
            foundObject = dispensaryMenu.match(prodRegex);
            // Match on Fields:
            // const foundProducts = [];
            if (foundObject) {
                // iterate through the menu
                console.log(`Found ${foundObject.length} for ${dispensary['Name']}`);
              
                for (const product of foundObject) {
                  // skip deals
                  let dealRegex = /DealId/i;
                  let accessoryRegex = /Category=Accessories/i;
                  if (!product.match(dealRegex) && !product.match(accessoryRegex)) {
                    if (!brand) {
                              // match the fields for the items within the menu and determine if they are needed for our collection response
                      const categoryRegex = new RegExp(`category=${category},`,'i');
                      // if this matches the product category 
                      if (product.match(categoryRegex)) {
                          // determine if the name or 
                          // search product for the name and brand 
                          const nameRegex = new RegExp(`Name=([^,]+)`,'i');
                          productName = product.match(nameRegex);
                          if (productName[1]) {
                            let specificNameRegex = new RegExp(`${name}`,'i');
                              if (productName[1].match(specificNameRegex)){
                                let builtRespProd = buildProduct(product, dispensary['_id'], dispensary['Name'], dispensary['Region'], dispensary['Rating']);
                                dispensariesWithProduct.push(builtRespProd);
                              }
                            }
                              
                        }
                      }
                      else {
                        // have to look for products associated with a specific brand
                        const categoryRegex = new RegExp(`category=${category},`,'i');
                        // if this matches the product category 
                        if (product.match(categoryRegex)) {
                          const brandRegex = new RegExp(`BrandName=([^,]+)`,'i');
                          productBrandName = product.match(brandRegex);
                          if (productBrandName[1]) {
                            let specificBrand = new RegExp(`${brand}`,'i');
                            // case where the brand matches
                            if (productBrandName[1].match(specificBrand)) {
                              if (product.match(brandRegex)) {
                                // determine if the name is similar to the brand for querying
                              const nameRegex = new RegExp(`Name=([^,]+)`,'i');
                              productName = product.match(nameRegex);
                              if (productName[1]) {
                                let specificNameRegex = new RegExp(`${name}`,'i');
                                  if (productName[1].match(specificNameRegex)){
                                    let builtRespProd = buildProduct(product, dispensary['_id'], dispensary['Name'],dispensary['Region'], dispensary['Rating']);
                                    dispensariesWithProduct.push(builtRespProd);
                                  }
                                }
                              }
                            }
                          }
                          
                        }
                      }
                    }
                } 
            } 
        }

        
        console.log('Results count:', dispensaries.length);  // Log the result count
        res.json(dispensariesWithProduct);
    } catch (error) {
        console.error('Error:', error);  // Log any errors
        res.status(500).json({ message: 'Error fetching dispensaries', error });
    }
};

const getDispensaryIds = async (req, res) => {
  const dispensaryIds = req.body;
  if (Array.isArray(dispensaryIds)) {
    let foundDispensaries = [];
    for (const id of dispensaryIds) {
        const dispensary = await Dispensary.findById(id);
        if (dispensary) {
          foundDispensaries.push(dispensary);
        }
    }

    res.status(200).send(foundDispensaries);
  } else {
    res.status(400).send({ error: 'Invalid input' });
  }
  
}



module.exports = {
    getDispensary,
    getDispenseriesWithProduct,
    getDispensaryProductOptions,
    getStatesFromRegions,
    getDispensaryBrandOptions,
    getDispensaryIds
}
