const User = require('../models/user')
const CarOwner = require('../models/carOwner')
const Supplier = require('../models/supplier')
const Mechanic = require('../models/mechanic')
const Customizer = require('../models/customizer')
const Products = require('../models/products')
const Services = require('../models/services')
const Workshop = require('../models/workshop')
const BookingService = require('../models/booking')
const Cart = require('../models/cart')
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

const getWorkshopDetails = async (req, res) => {
  try {
        const { mechanicId } = req.params;
        const workshop = await Workshop.findOne({ mechanic_id: mechanicId });

        if (!workshop) {
            return res.status(404).json({ error: 'Workshop not found' });
        }

        res.json({ schedule: workshop.schedule,
          experiences: workshop.experiences,
          name: workshop.name,
          address: workshop.address,
          city: workshop.city,
          description: workshop.description });
    } catch (error) {
        console.error('Error fetching schedule:', error);
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

const workshopDetails = async (req, res) => {
    const { userDetails, schedule } = req.body;
    const mechanic_id = userDetails._id;
  
    try {
      // Find workshop details for the mechanic
      let workshop = await Workshop.findOne({ mechanic_id });
  
      if (!workshop) {
        // Create new workshop details if it doesn't exist
        workshop = await Workshop.create({
          mechanic_id,
          schedule,
          name: userDetails.workshop_name,
          address: userDetails.workshop_address,
          city: userDetails.workshop_city,
          description: userDetails.workshop_description
        });
      } else {
        // Update schedule if workshop already exists
        workshop.schedule = schedule;
        await workshop.save();
      }
  
      res.json(workshop);
    } catch (error) {
      console.error('Error updating workshop details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const setWorkshopExperience = async (req, res) => {
  const { userDetails, newExperience } = req.body;
  const mechanic_id = userDetails._id;

  try {
    // Find workshop for the mechanic
    const workshop = await Workshop.findOne({ mechanic_id });

    if (!workshop) {
      // If no workshop found, create a new one
      const newWorkshop = await Workshop.create({
        mechanic_id,
        experiences: [newExperience],
        name: userDetails.workshop_name,
        address: userDetails.workshop_address,
        city: userDetails.workshop_city,
        description: userDetails.workshop_description
      });

      return res.json(newWorkshop);
    }

    // If workshop found, update the experiences
    workshop.experiences.push(newExperience);
    await workshop.save();

    res.json(workshop);
  } catch (error) {
    console.error('Error updating workshop details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

    const { productId } = req.params;
    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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
        const serviceId = req.params.id;
        const deletedService = await Services.findByIdAndDelete(serviceId);

        if (!deletedService) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const getProfilebyId = async (req,res) => {
    try {
        const { id } = req.params; // Destructure id from req.params

        // Fetch the service details by ID from the database
        let userDetails = await Mechanic.findById(id);

        if (!userDetails) {
            userDetails = await Customizer.findById(id);
        }

        // Check if the service was found
        if (!userDetails) {
            return res.status(404).json({ error: 'Mechanic/Customizer not found' });
        }

        res.json(userDetails);
      } catch (error) {
          console.error('Error fetching mechanic/customizer:', error);
          res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const getWorkshopServices = async (req, res) => {
    try {
      const { mechanicId } = req.params; // Destructure id from req.params
  
      // Fetch the service details by ID from the database
      const serDetails = await Services.find({ mechanic_id: mechanicId });
  
      // Check if the service was found
      if (!serDetails) {
        return res.status(404).json({ error: 'Service not found' });
      }
  
      res.json(serDetails);
    } catch (error) {
      console.error('Error fetching workshop services:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getService = async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);
    if (!service) {
        return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
}

// const bookService = async (req,res) => {
//   const { serviceId, user_id, mechanic_id, date, time, description } = req.body;

//     // Validate the required fields
//     if (!serviceId || !user_id || !mechanic_id || !date || !time || !description) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Check if the time format is correct
//     if (!/\d{2}:\d{2}/.test(time)) {
//         return res.status(400).json({ error: 'Invalid time format' });
//     }

//     try {
//         // Create a new booking
//         const newBooking = new BookingService({
//             serviceId,
//             user_id,
//             mechanic_id,
//             date,
//             time,
//             description,
//             atMechanic: true, // Setting atMechanic to true by default
//             mechanicDescr: '', // Leaving mechanicDescr empty by default
//             mechanicPrice: '' // Leaving mechanicPrice empty by default
//         });

//         // Save the booking to the database
//         await newBooking.save();
//         res.json({ success: true, message: 'Service booked successfully!' });
//     } catch (error) {
//         console.error('Error booking service:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

const bookService = async (req, res) => {
  const { serviceId, user_id, mechanic_id, date, time, description } = req.body;
    // Validate the required fields
    if (!serviceId || !user_id || !mechanic_id || !date || !time || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the time format is correct
    if (!/\d{2}:\d{2}/.test(time)) {
        return res.status(400).json({ error: 'Invalid time format' });
    }

    try {
        let images = [];
        // Check if images are present in the request
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path);
        }

        // Create a new booking
        const newBooking = new BookingService({
            serviceId,
            user_id,
            mechanic_id,
            date,
            time,
            description,
            images,
            atMechanic: true, // Setting atMechanic to true by default
            mechanicDescr: '', // Leaving mechanicDescr empty by default
            mechanicPrice: ''
        });

        // Save the booking to the database
        await newBooking.save();
        res.json({ success: true, message: 'Service booked successfully!' });
    } catch (error) {
        console.error('Error booking service:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getBookings = async (req, res) => {
  try {
      const bookings = await BookingService.find({ mechanic_id: req.params.mechanicId });
      res.json(bookings);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateBooking = async (req, res) => {
  const { atMechanic, mechanicPrice, mechanicDescr } = req.body;

    try {
        const updatedBooking = await BookingService.findByIdAndUpdate(
            req.params.id,
            { atMechanic, mechanicPrice, mechanicDescr },
            { new: true } // Return the updated document
        );

        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json({ success: true, updatedBooking });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUserBookings = async (req, res) => {
  try {
      const bookings = await BookingService.find({ user_id: req.params.userId });
      res.status(200).json(bookings);
  } catch (error) {
      console.error('Error fetching user bookings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

const logoutUser = async (req, res) => {
    res.cookie('token', '').json('ok');
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

const getCartProducts = async (req, res) => {
  try {
    if (req.cookies && req.cookies.token) {
      const { token } = req.cookies;
      const user = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user's cart document
      const cart = await Cart.findOne({ user_id: user.id }).exec();
      if (!cart || cart.products.length === 0) {
        return res.status(404).json({ message: 'No products found in the cart' });
      }

      // Fetch product details for each product in the cart
      const cartProducts = await Promise.all(cart.products.map(async (product) => {
        const productDetails = await Products.findById(product.product_id).exec();
        if (!productDetails) {
          return {
            _id: product.product_id,
            deleted: true,
            cartQuantity: product.quantity, // Include quantity from cart
          };
        }
        return {
          ...productDetails.toJSON(),
          cartQuantity: product.quantity, // Include quantity from cart
        };
      }));

      res.json(cartProducts);
    } else {
      res.status(400).json({ message: 'No token provided' });
    }
  } catch (error) {
    console.error("Error in getCartProducts:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addToCart = async (req, res) => {
  try {

    if (req.cookies && req.cookies.token) {

      const { token } = req.cookies;
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const userId = user.id;


      const { productId, quantity } = req.body;

      // Find the user's cart or create a new one if it doesn't exist
      let cart = await Cart.findOne({ user_id: userId });
      if (!cart) {
        cart = new Cart({ user_id: userId, products: [] });
      }

      // Check if the product is already in the cart
      const existingProductIndex = cart.products.findIndex(product => product.product_id === productId);

      if (existingProductIndex !== -1) {
        // Update quantity if product already exists in the cart
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.products.push({ product_id: productId, quantity });
      }

      // Save the updated cart
      await cart.save();

      // Send success response
      res.status(200).json({ message: 'Product added to cart successfully' });
    } else {

      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const removeFromCart = async (req, res) => {
  try {
    if (req.cookies && req.cookies.token) {

      const { token } = req.cookies;
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const userId = user.id; // Extract user ID from JWT token
      const { productId } = req.params;

      // Find the user's cart
      let cart = await Cart.findOne({ user_id: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Remove the product from the cart
      cart.products = cart.products.filter(product => product.product_id !== productId);
      await cart.save();

      res.status(200).json({ message: 'Product removed from cart successfully' });
    } else {

      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getSupplierStore = async (req, res) => {
  const { supplierId } = req.query;

  try {
    // Fetch products based on the supplierId
    const products = await Products.find({ supplier_id: supplierId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this supplier' });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching supplier's products:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getSupplierInfo = async (req, res) => {
  const { supplierId } = req.query;

  try {
    const supplier = await Supplier.find({ user_id: supplierId });

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.json(supplier);
  } catch (error) {
    console.error("Error fetching supplier's information:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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
    getProfilebyId,
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
    deleteService,
    workshopDetails,
    getWorkshopDetails,
    setWorkshopExperience,
    getService,
    bookService,
    getBookings,
    getUser,
    updateBooking,
    getUserBookings,
    getProductById,
    getCartProducts,
    removeFromCart,
    addToCart,
    getSupplierStore,
    getSupplierInfo
}