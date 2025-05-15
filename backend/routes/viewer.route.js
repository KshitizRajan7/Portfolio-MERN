import express from 'express';


import {body} from 'express-validator';
import {registerViewer, loginViewer, getViewerProfile, logoutViewer} from '../controllers/viewer.controller.js';
import {authViewer} from '../middlewares/auth.middleware.js'; // Import the authViewer middleware
const router= express.Router();

router.post('/register', [
    body('fullName.firstName').isLength({min:3}).withMessage('First name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], registerViewer); // Route for registering a new viewer

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
], loginViewer); // Route for logging in a viewer

router.get('/profile', authViewer, getViewerProfile); // Route for getting the viewer's profile, protected by authViewer middleware
router.get('/logout', authViewer, logoutViewer); // Route for logging out a viewer, protected by authViewer middleware 

export default router; // Export the router for use in other parts of the application
