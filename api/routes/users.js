const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Product = require('../models/product');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    const response = {
      count: users.length,
      orders: users.map(order => {
        return {
          id: user._id,
          email: user.email,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/users/' + user._id
          }
        };
      })
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.post('/signup', async (req, res, next) => {
  console.log(req.body);
  try {
    const userExist = await User.exists({ email: req.body.email });
    if (userExist) {
      throw 'User already exist';
    }
    // const hash = await bcrypt.hash(req.body.password, 10); // moved to mongoose schema
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });
    const createdUser = await user.save();
    res.status(201).json({
      message: 'User Created',
      createdUser: {
        id: createdUser._id,
        email: createdUser.email
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_KEY,
          { expiresIn: '1hr' }
        );
        return res.status(200).json({
          message: 'Authantication successful',
          token: token
        });
      }
    }
    if (!user || !validPassword) {
      res.status(401).json({
        message: 'Athentication failed'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.get('/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const response = await User.findById(userId).lean();
    console.log(response);
    if (response) {
      const user = response;
      return res.status(200).json(user);
    }
    res.status(404).json({ message: 'No order was found with that ID' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

// router.patch('/:userId', async (req, res, next) => {
//   const userId = req.params.userId;
//   const update = req.body;
//   const options = { new: true };
//   try {
//     const updatedOrder = await Product.findByIdAndUpdate(
//       userId,
//       update,
//       options
//     );
//     console.log(updatedOrder);
//     if (updatedOrder) {
//       return res.status(200).json(updatedOrder);
//     }
//     res.status(404).json({ message: 'No order was found with that ID' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error });
//   }
// });

router.delete('/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log(deletedUser);
    if (deletedUser) {
      return res.status(200).json({
        message: 'User deleted',
        user: {
          id: deletedUser._id,
          email: deletedUser.email
        }
      });
    }
    res.status(404).json({ message: 'No user was found with that ID' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
