import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage } from './organizations.js';
import { showProjectsPage ,showProjectDetailsPage,showNewProjectForm, processNewProjectForm,projectValidation, showEditProjectForm,
  processEditProjectForm,  volunteerForProject,
  unvolunteerForProject } from './projects.js';
import { showCategoriesPage, showCategoryDetailsPage,showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation } from './categories.js';
import { testErrorPage } from './errors.js';
import { showOrganizationDetailsPage, showNewOrganizationForm,processNewOrganizationForm, organizationValidation ,showEditOrganizationForm,processEditOrganizationForm} from './organizations.js';
import {showUserRegistrationForm, processUserRegistrationForm,showLoginForm, processLoginForm, processLogout ,requireLogin, showDashboard,requireRole,showUsersPage} from './users.js';


const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/new-organization',requireRole('admin'), showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization',requireRole('admin'), organizationValidation, processNewOrganizationForm);
// Route for new project page
router.get('/new-project',requireRole('admin'), showNewProjectForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole('admin'), showUsersPage);

// Routes for volunteering
router.post('/project/:id/volunteer', requireLogin, volunteerForProject);
router.post('/project/:id/unvolunteer', requireLogin, unvolunteerForProject);

// Route to handle new project form submission
router.post('/new-project',requireRole('admin'), projectValidation,processNewProjectForm);
router.get('/new-category',requireRole('admin'), showNewCategoryForm);
router.post('/new-category',requireRole('admin'), categoryValidation, processNewCategoryForm);
// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
// Route for  details page
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

//edit routes
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);
// error-handling routes
router.get('/test-error', testErrorPage);

export default router;