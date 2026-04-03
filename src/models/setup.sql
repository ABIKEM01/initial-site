
-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- ========================================
-- Service Projects Table
-- ========================================
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert Sample Service Projects
-- ========================================

INSERT INTO project (organization_id, title, description, location, date)
VALUES
-- BrightFuture Builders (1)
(1, 'Community Park Renovation', 'Renovating the central community park playground.', 'Lagos', '2026-04-10'),
(1, 'School Building Repair', 'Repairing classrooms for a local primary school.', 'Ibadan', '2026-04-15'),
(1, 'Community Bridge Construction', 'Building a small bridge for easier village access.', 'Ogun State', '2026-04-20'),
(1, 'Public Library Upgrade', 'Renovating local library facilities.', 'Abuja', '2026-04-25'),
(1, 'Community Center Construction', 'Constructing a new youth center.', 'Port Harcourt', '2026-04-30'),

-- GreenHarvest Growers (2)
(2, 'Urban Garden Setup', 'Setting up vegetable gardens in neighborhoods.', 'Lagos', '2026-05-02'),
(2, 'Community Farming Workshop', 'Teaching residents sustainable farming.', 'Ibadan', '2026-05-05'),
(2, 'School Garden Program', 'Introducing farming to school students.', 'Abeokuta', '2026-05-10'),
(2, 'Neighborhood Compost Training', 'Teaching compost production.', 'Lagos', '2026-05-15'),
(2, 'Community Tree Planting', 'Planting fruit trees in communities.', 'Abuja', '2026-05-20'),

-- UnityServe Volunteers (3)
(3, 'Food Bank Distribution', 'Organizing food supplies for families.', 'Lagos', '2026-06-01'),
(3, 'Volunteer Tutoring Program', 'Helping students with academic support.', 'Ibadan', '2026-06-05'),
(3, 'Community Health Outreach', 'Providing basic health checks.', 'Oyo', '2026-06-10'),
(3, 'Neighborhood Cleanup', 'Cleaning streets and public areas.', 'Lagos', '2026-06-15'),
(3, 'Youth Mentorship Event', 'Mentoring teenagers in career development.', 'Abuja', '2026-06-20');


-- ========================================
-- Category Table
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

-- ========================================
-- Project-Category Junction Table (many-to-many)
-- ========================================
CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert Categories
-- ========================================
INSERT INTO category (name)
VALUES
('Construction & Infrastructure'),
('Environment & Sustainability'),
('Education & Youth'),
('Health & Wellness'),
('Community & Social Services');

-- ========================================
-- Associate Projects with Categories
-- ========================================
-- BrightFuture Builders projects (project_id 1-5) → Construction & Infrastructure (1)
INSERT INTO project_category (project_id, category_id) VALUES
(1, 1), -- Community Park Renovation
(2, 1), -- School Building Repair
(2, 3), -- also Education & Youth
(3, 1), -- Community Bridge Construction
(4, 1), -- Public Library Upgrade
(4, 3), -- also Education & Youth
(5, 1), -- Community Center Construction
(5, 5), -- also Community & Social Services

-- GreenHarvest Growers projects (project_id 6-10) → Environment & Sustainability (2)
(6, 2), -- Urban Garden Setup
(7, 2), -- Community Farming Workshop
(7, 3), -- also Education & Youth
(8, 2), -- School Garden Program
(8, 3), -- also Education & Youth
(9, 2), -- Neighborhood Compost Training
(10, 2), -- Community Tree Planting

-- UnityServe Volunteers projects (project_id 11-15) → Community & Social Services (5)
(11, 5), -- Food Bank Distribution
(12, 3), -- Volunteer Tutoring Program → Education & Youth
(12, 5), -- also Community & Social Services
(13, 4), -- Community Health Outreach → Health & Wellness
(14, 5), -- Neighborhood Cleanup
(14, 2), -- also Environment & Sustainability
(15, 3), -- Youth Mentorship Event → Education & Youth
(15, 5); -- also Community & Social Services


CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- Verify the data was inserted
SELECT * FROM roles;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);