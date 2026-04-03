import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage } from './organizations.js';
import { showProjectsPage ,showProjectDetailsPage,showNewProjectForm, processNewProjectForm,projectValidation, showEditProjectForm,
  processEditProjectForm } from './projects.js';
import { showCategoriesPage, showCategoryDetailsPage,showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation } from './categories.js';
import { testErrorPage } from './errors.js';
import { showOrganizationDetailsPage, showNewOrganizationForm,processNewOrganizationForm, organizationValidation ,showEditOrganizationForm,processEditOrganizationForm} from './organizations.js';
import {showUserRegistrationForm, processUserRegistrationForm,showLoginForm, processLoginForm, processLogout ,requireLogin, showDashboard} from './users.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
// Route for new project page
router.get('/new-project', showNewProjectForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

// Route to handle new project form submission
router.post('/new-project', projectValidation,processNewProjectForm);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
// Route for  details page
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

//edit routes
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);
// error-handling routes
router.get('/test-error', testErrorPage);

export default router;