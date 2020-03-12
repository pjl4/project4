const express = require('express');
const router = express.Router();

const User = require('../db/models/UserModel');

const bcrypt = require('bcrypt-nodejs');
router.post('/', (req, res) => {
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			res.json({
				error: 'Email in use'
			});
		} else {
			let createObj = req.body;
			createObj.pwHash = bcrypt.hashSync(req.body.pwHash);
			User.create(createObj)
				.then((user) => res.json(user))
				.catch(console.error);
		}
	});
});

router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (user) {
				if (bcrypt.compareSync(req.body.password, user.pwHash)) {
					res.json(user);
				} else {
					res.json({
						error: 'Email or password was incorrect'
					});
				}
			} else {
				res.json({
					error: 'Email or password was incorrect'
				});
			}
		})
		.catch(console.error);
});
router.get('/:id', (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			res.json(user);
		})
		.catch(console.error);
});
router.put('/:id', (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			if (user) {
				if (bcrypt.compareSync(req.body.currentPassword, user.pwHash)) {
					req.body.newPassword = bcrypt.hashSync(
						req.body.newPassword
					);
					user.pwHash = req.body.newPassword;
					user.save();
					res.json(user);
				} else {
					res.json({
						error: 'Old password was incorrect'
					});
				}
			}
		})
		.catch(console.error);
});
router.delete('/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then((user) => res.json(user))
		.catch(console.error);
});

module.exports = router;
