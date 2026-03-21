// Import any needed model functions
import { getAllProjects } from '../models/projects.js';
import { 
  getUpcomingProjects, 
  getProjectDetails 
} from '../models/projects.js';

 

// Constant
const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Updated projects page
const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = 'Upcoming Service Projects';

  res.render('projects', { title, projects });
};

// NEW: Project details page
const showProjectDetailsPage = async (req, res) => {
  const id = req.params.id;

  const project = await getProjectDetails(id);

  res.render('project', {
    title: project.title,
    project
  });
};

// Export any controller functions
export { showProjectsPage ,showProjectDetailsPage};