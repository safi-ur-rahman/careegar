const User = require('../models/user')
const CarOwner = require('../models/carOwner')
const Supplier = require('../models/supplier')
const Mechanic = require('../models/mechanic')
const Customizer = require('../models/customizer')
const Products = require('../models/products')
const Services = require('../models/services')
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const getProfile = async (req, res) => {
    try {
        if (req.cookies && req.cookies.token) {
            const { token } = req.cookies;
            const user = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch additional user details from the database
            const userDetails = await User.findOne({ _id: user.id }, 'userType completedProfile phoneNumber').exec();

            // Combine user details with the user object
            const extendedUser = { ...user, ...userDetails._doc };

            res.json(extendedUser);
        } else {
            res.json(null);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCarOwnerProfile = async (req, res) => {
  try {
      if (req.cookies && req.cookies.token) {
          const { token } = req.cookies;
          const user = jwt.verify(token, process.env.JWT_SECRET);

          // Fetch additional user details from the database
          const carOwnerDetails = await CarOwner.findOne(
              { user_id: user.id },
              'image address city car_make car_model car_submodel car_year'
          ).exec();

          if (carOwnerDetails) {
              // Construct the image URL based on the server setup
              const imageUrl = `${req.protocol}://${req.get('host')}/${carOwnerDetails.image}`;

              // Combine user details with the user object, including the image URL
              const extendedUser = { ...user, ...carOwnerDetails._doc, imageUrl };

              res.json(extendedUser);
          } else {
              // Handle the case when carOwnerDetails is not found
              res.json(null);
          }
      } else {
          // Handle the case when the token is not present in cookies
          res.json(null);
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSupplierProfile = async (req, res) => {
  try {
      if (req.cookies && req.cookies.token) {
          const { token } = req.cookies;
          const user = jwt.verify(token, process.env.JWT_SECRET);

          // Fetch additional user details from the database
          const supplierDetails = await Supplier.findOne(
              { user_id: user.id },
              'image store_name store_address store_city store_description'
          ).exec();

          if (supplierDetails) {
              // Construct the image URL based on the server setup
              const imageUrl = `${req.protocol}://${req.get('host')}/${supplierDetails.image}`;

              // Combine user details with the user object, including the image URL
              const extendedUser = { ...user, ...supplierDetails._doc, imageUrl };

              res.json(extendedUser);
          } else {
              // Handle the case when carOwnerDetails is not found
              res.json(null);
          }
      } else {
          // Handle the case when the token is not present in cookies
          res.json(null);
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMechanicProfile = async (req, res) => {
  try {
      if (req.cookies && req.cookies.token) {
          const { token } = req.cookies;
          const user = jwt.verify(token, process.env.JWT_SECRET);

          // Fetch additional user details from the database
          const mechanicDetails = await Mechanic.findOne(
              { user_id: user.id },
              'image workshop_name workshop_address workshop_city workshop_description tags'
          ).exec();

          if (mechanicDetails) {
              // Construct the image URL based on the server setup
              const imageUrl = `${req.protocol}://${req.get('host')}/${mechanicDetails.image}`;

              // Combine user details with the user object, including the image URL
              const extendedUser = { ...user, ...mechanicDetails._doc, imageUrl };

              res.json(extendedUser);
          } else {
              // Handle the case when carOwnerDetails is not found
              res.json(null);
          }
      } else {
          // Handle the case when the token is not present in cookies
          res.json(null);
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCustomizerProfile = async (req, res) => {
  try {
      if (req.cookies && req.cookies.token) {
          const { token } = req.cookies;
          const user = jwt.verify(token, process.env.JWT_SECRET);

          // Fetch additional user details from the database
          const customizerDetails = await Customizer.findOne(
              { user_id: user.id },
              'image workshop_name workshop_address workshop_city workshop_description tags'
          ).exec();

          if (customizerDetails) {
              // Construct the image URL based on the server setup
              const imageUrl = `${req.protocol}://${req.get('host')}/${customizerDetails.image}`;

              // Combine user details with the user object, including the image URL
              const extendedUser = { ...user, ...customizerDetails._doc, imageUrl };

              res.json(extendedUser);
          } else {
              // Handle the case when carOwnerDetails is not found
              res.json(null);
          }
      } else {
          // Handle the case when the token is not present in cookies
          res.json(null);
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchUsers = async (req, res) => {
    try {
        const { search } = req.query;
  
        if (!search) {
            return res.json([]);
        }
  
        // Perform a case-insensitive search on name and email fields
        const mechanic = await Mechanic.find({
            $or: [
                { workshop_name: { $regex: search, $options: 'i' } }
            ]
        }).exec();
  
        const supplier = await Supplier.find({
            $or: [
                { store_name: { $regex: search, $options: 'i' } }
            ]
        }).exec();
  
        const customizer = await Customizer.find({
            $or: [
                { workshop_name: { $regex: search, $options: 'i' } }
            ]
        }).exec();
  
        const combinedResults = [...mechanic, ...supplier, ...customizer];
  
        res.json(combinedResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const searchProducts = async (req, res) => {
    try {
        const { search } = req.query;
  
        if (!search) {
            return res.json([]);
        }
  
        // Split the search string into individual terms
        const searchTerms = search.split(' ');
  
        // Construct an array of $regex expressions for each term
        const regexExpressions = searchTerms.map(term => ({
            $or: [
                { product_name: { $regex: term, $options: 'i' } },
                { product_description: { $regex: term, $options: 'i' } }
            ]
        }));
  
        // Combine the expressions using $and
        const products = await Products.find({
            $and: regexExpressions
        }).exec();
  
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const searchServices = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.json([]);
        }

        // Split the search string into individual terms
        const searchTerms = search.split(' ');

        // Construct an array of $regex expressions for each term
        const regexExpressions = searchTerms.map(term => ({
            $or: [
                { service_name: { $regex: term, $options: 'i' } },
                { service_description: { $regex: term, $options: 'i' } }
            ]
        }));

        // Combine the expressions using $and
        const services = await Services.find({
            $and: regexExpressions
        }).exec();

        // Extract mechanic IDs from the found services
        const mechanicIds = services.map(service => service.mechanic_id);

        // Find mechanics with the extracted IDs
        const mechanics = await Mechanic.find({ user_id: { $in: mechanicIds } }).exec();

        // Create a map for quick lookup
        const mechanicMap = new Map();
        mechanics.forEach(mechanic => mechanicMap.set(mechanic.user_id.toString(), mechanic));


        // Attach mechanic names to the services
        const servicesWithMechanic = services.map(service => {
            const mechanic = mechanicMap.get(service.mechanic_id.toString());
            
            // Attach mechanic object directly to the service
            
            if (mechanic) {
                service.mechanic = mechanic; // Attach the entire mechanic object
            }

            return service;
        });

        res.json(servicesWithMechanic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const registerUser = async (req, res) => {
    try{
        const {name, phoneNumber, email, password} = req.body;

        // check name
        if(!name) {
            return res.json({
                error: 'Name is requierd!'
            })
        };
        // check phone number
        if(phoneNumber.length != 11) {
            return res.json({
                error: 'Enter a valid phone number!'
            })
        };

        // check password
        if(!password) {
            return res.json({
                error: 'Password is requierd!'
            })
        };
        if(password.length < 8) {
            return res.json({
                error: 'Password should be at least of 8 characters!'
            })
        };

        // check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error:  'Email already in use.'
            })
        };
        // Check if email has @ and .com
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({
                error: 'Enter a valid email address!'
            });
        }


        const hashedPassword = await hashPassword(password)

        //create user in db
        const user = await User.create({
            name, 
            phoneNumber, 
            email, 
            password: hashedPassword,
            userType : 'none',
            completedProfile : false,
        })

        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if email has @ and .com
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({
                error: 'Enter a valid email address!'
            });
        }
        // Check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: 'No User Found with this Email!'
            })
        }

        // if password match
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
            
        }
        else if (!match) {
            res.json({
                error: "Wrong Password!"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const carownerProfile = async (req, res) => {
    try {
        const { user_id, address, city, car_make, car_model, car_submodel, car_year } = req.body;
        const imagePath = req.file.path; // Path to the uploaded image
    
        // Create user in the database
        const carOwner = await CarOwner.create({
          user_id,
          image: imagePath, // Save the path to the image
          address,
          city,
          car_make,
          car_model,
          car_submodel,
          car_year
        });
 
        // Update User model with completedProfile and userType
        await User.findOneAndUpdate(
          { _id: user_id },
          {
            $set: {
              completedProfile: true,
              userType: 'carOwner'
            }
          },
          { new: true }
        );
    
        res.json(carOwner);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
}

const supplierProfile = async (req, res) => {
    try {
        const { user_id, store_name, store_address, store_city, store_description } = req.body;
        const imagePath = req.file.path; // Path to the uploaded image
    
        // Create user in the database
        const supplier = await Supplier.create({
          user_id,
          image: imagePath, // Save the path to the image
          store_name,
          store_address,
          store_city,
          store_description
        });
 
        // Update User model with completedProfile and userType
        await User.findOneAndUpdate(
          { _id: user_id },
          {
            $set: {
              completedProfile: true,
              userType: 'supplier'
            }
          },
          { new: true }
        );
    
        res.json(supplier);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
}

const mechanicProfile = async (req, res) => {
    try {
        const { user_id, workshop_name, workshop_address, workshop_city, workshop_description } = req.body;
        const imagePath = req.file.path; // Path to the uploaded image
    
        let { tags } = req.body;
        // Ensure that tags is an array
        if (typeof tags === 'string') {
            tags = tags.split(',').map(tag => tag.trim());
        } else if (!Array.isArray(tags)) {
            tags = [tags]; // Convert to array if it's not already
        }
        
        // Create user in the database
        const mechanic = await Mechanic.create({
          user_id,
          image: imagePath, // Save the path to the image
          workshop_name,
          workshop_address,
          workshop_city,
          workshop_description,
          tags
        });
 
        // Update User model with completedProfile and userType
        await User.findOneAndUpdate(
          { _id: user_id },
          {
            $set: {
              completedProfile: true,
              userType: 'mechanic'
            }
          },
          { new: true }
        );
    
        res.json(mechanic);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
}

const customizerProfile = async (req, res) => {
    try {
        const { user_id, workshop_name, workshop_address, workshop_city, workshop_description } = req.body;
        const imagePath = req.file.path; // Path to the uploaded image
    
        let { tags } = req.body;
        // Ensure that tags is an array
        if (typeof tags === 'string') {
            tags = tags.split(',').map(tag => tag.trim());
        } else if (!Array.isArray(tags)) {
            tags = [tags]; // Convert to array if it's not already
        }
        
        // Create user in the database
        const customizer = await Customizer.create({
          user_id,
          image: imagePath, // Save the path to the image
          workshop_name,
          workshop_address,
          workshop_city,
          workshop_description,
          tags
        });
 
        // Update User model with completedProfile and userType
        await User.findOneAndUpdate(
          { _id: user_id },
          {
            $set: {
              completedProfile: true,
              userType: 'customizer'
            }
          },
          { new: true }
        );
    
        res.json(customizer);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
}

const addProduct = async (req, res) => {
    try {
      const { supplier_id, product_name, product_description, product_price, product_quantity } = req.body;
  
      if (!supplier_id) {
        return res.json({
          error: 'Supplier not found!',
        });
      }
  
      if (!product_name) {
        return res.json({
          error: 'Product Name is required!',
        });
      }
  
      if (!product_description) {
        return res.json({
          error: 'Product description is required!',
        });
      }
  
      if (!product_price) {
        return res.json({
          error: 'Enter a product price!',
        });
      }
  
      if (!product_quantity) {
        return res.json({
          error: 'Enter a product quantity!',
        });
      }
  
      // Check if images are present in the request
      if (!req.files || req.files.length === 0) {
        return res.json({
          error: 'At least one image is required!',
        });
      }
  
      const images = req.files.map(file => file.path);
  
      const product = await Products.create({
        supplier_id,
        product_name,
        product_description,
        product_price,
        product_quantity,
        product_availability: true,
        images,
      });
  
      return res.json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

const editProduct = async (req, res) => {
  try {
      const productToUpdate = req.body;

      const product = await Products.findById(productToUpdate.objID);

      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }

      await Products.updateOne({ _id: productToUpdate.objID }, { $set: productToUpdate });

      res.json({ message: 'Product updated successfully' });
  } catch (error) {
      console.log(error);
  }
}

const deleteProduct = async (req, res) => {
  
  try {
      const product = req.body;
      const deletedProduct = await Products.findOneAndDelete(product);

      if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }

      res.json({ message: 'Product deleted successfully' });
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getProducts = async (req, res) => {

    try {
            // Fetch additional user details from the database
            const prodDetails = await Products.find().exec();
  
            res.json(prodDetails);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
  }

const getStoreProducts = async (req, res) => {

  try {
      if (req.cookies && req.cookies.token) {
          const { token } = req.cookies;
          const user = jwt.verify(token, process.env.JWT_SECRET);

          // Fetch additional user details from the database
          const prodDetails = await Products.find({ supplier_id: user.id }).exec();

          res.json(prodDetails);
      } else {
          res.json(null);
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }

}

const addService = async (req, res) => {
    try {
      const { mechanic_id, service_name, service_description, service_price } = req.body;
  
      let { tags } = req.body;
      // Ensure that tags is an array
      if (typeof tags === 'string') {
          tags = tags.split(',').map(tag => tag.trim());
      } else if (!Array.isArray(tags)) {
          tags = [tags]; // Convert to array if it's not already
      }

      if (!mechanic_id) {
        return res.json({
          error: 'Mechanic not found!',
        });
      }
  
      if (!service_name) {
        return res.json({
          error: 'Service Name is required!',
        });
      }
  
      if (!service_description) {
        return res.json({
          error: 'Service description is required!',
        });
      }
  
      if (!service_price) {
        return res.json({
          error: 'Enter a service price!',
        });
      }
  
      // Check if images are present in the request
      if (!req.files || req.files.length === 0) {
        return res.json({
          error: 'At least one image is required!',
        });
      }
  
      const images = req.files.map(file => file.path);
  
      const service = await Services.create({
        mechanic_id,
        service_name,
        service_description,
        service_price,
        service_availability: true,
        images,
        tags
      });
  
      return res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

const editService = async (req, res) => {
    try {
        const serviceToUpdate = req.body;
  
        const service = await Services.findById(serviceToUpdate.objID);
  
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
  
        await Services.updateOne({ _id: serviceToUpdate.objID }, { $set: serviceToUpdate });
  
        res.json({ message: 'Service updated successfully' });
    } catch (error) {
        console.log(error);
    }
  }

const deleteService = async (req, res) => {
  
    try {
        const service = req.body;
        const deletedService = await Services.findOneAndDelete(service);
  
        if (!deletedService) {
            return res.status(404).json({ error: 'Service not found' });
        }
  
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const getWorkshopServices = async (req, res) => {

    try {
        if (req.cookies && req.cookies.token) {
            const { token } = req.cookies;
            const user = jwt.verify(token, process.env.JWT_SECRET);
  
            // Fetch additional user details from the database
            const serDetails = await Services.find({ mechanic_id: user.id }).exec();
  
            res.json(serDetails);
        } else {
            res.json(null);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const logoutUser = async (req, res) => {
    res.cookie('token', '').json('ok');
}

module.exports = {
    getProfile,
    registerUser,
    loginUser,
    logoutUser,
    carownerProfile,
    supplierProfile,
    mechanicProfile,
    customizerProfile,
    getCarOwnerProfile,
    getSupplierProfile,
    getMechanicProfile,
    getCustomizerProfile,
    searchUsers,
    searchProducts,
    searchServices,
    addProduct,
    getProducts,
    getStoreProducts,
    editProduct,
    deleteProduct,
    addService,
    getWorkshopServices,
    editService,
    deleteService
}