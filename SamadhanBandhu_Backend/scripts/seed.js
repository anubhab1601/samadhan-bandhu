import bcrypt from 'bcryptjs';
import { run, initializeDatabase } from '../src/database/init.js';
import { generateId } from '../src/utils/helpers.js';

const seedDatabase = async () => {
  try {
    console.log('Initializing database...');
    await initializeDatabase();

    console.log('Seeding test data...');

    // Create test users
    const users = [
      {
        id: generateId(),
        email: 'central@samadhan.gov.in',
        password: 'password123',
        firstName: 'Central',
        lastName: 'Admin',
        role: 'central',
        department: 'PM Office',
        designation: 'Administrator',
        state: 'National'
      },
      {
        id: generateId(),
        email: 'state@samadhan.gov.in',
        password: 'password123',
        firstName: 'State',
        lastName: 'Officer',
        role: 'state',
        department: 'State Development',
        designation: 'State Coordinator',
        state: 'Bihar'
      },
      {
        id: generateId(),
        email: 'block@samadhan.gov.in',
        password: 'password123',
        firstName: 'Block',
        lastName: 'Manager',
        role: 'block',
        department: 'Block Development',
        designation: 'Block Coordinator',
        state: 'Bihar',
        district: 'Patna',
        block: 'Patna City'
      },
      {
        id: generateId(),
        email: 'agency@samadhan.gov.in',
        password: 'password123',
        firstName: 'Agency',
        lastName: 'Partner',
        role: 'agency',
        department: 'Construction',
        designation: 'Agency Manager',
        state: 'Bihar'
      },
      {
        id: generateId(),
        email: 'fieldofficer@samadhan.gov.in',
        password: 'password123',
        firstName: 'Field',
        lastName: 'Officer',
        role: 'field-officer',
        department: 'Field Monitoring',
        designation: 'Field Officer',
        state: 'Bihar',
        district: 'Patna'
      },
      {
        id: generateId(),
        email: 'ivaofficer@samadhan.gov.in',
        password: 'password123',
        firstName: 'IVA',
        lastName: 'Officer',
        role: 'iva-officer',
        department: 'Independent Verification',
        designation: 'IVA Officer',
        state: 'Bihar',
        district: 'Patna'
      }
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await run(
        `INSERT INTO users (id, email, password, firstName, lastName, role, department, designation, state, district, block, isActive, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))`,
        [user.id, user.email, hashedPassword, user.firstName, user.lastName, user.role, user.department, user.designation, user.state, user.district, user.block]
      );
    }

    console.log('✓ Users created');

    // Create test projects
    const projectId1 = generateId();
    const projectId2 = generateId();

    await run(
      `INSERT INTO projects (id, title, description, state, district, block, village, category, budgetAmount, status, startDate, endDate, latitude, longitude, createdBy, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [projectId1, 'School Construction', 'Building a new government school', 'Bihar', 'Patna', 'Patna City', 'Rajendra Nagar', 'Education', 5000000, 'ongoing', '2024-01-01', '2024-12-31', 25.5941, 85.1376, users[0].id]
    );

    await run(
      `INSERT INTO projects (id, title, description, state, district, block, village, category, budgetAmount, status, startDate, endDate, latitude, longitude, createdBy, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [projectId2, 'Road Construction', 'Building rural connectivity road', 'Bihar', 'Patna', 'Patna Sahib', 'Bakhtiarpur', 'Infrastructure', 10000000, 'planning', '2024-02-01', '2025-01-31', 25.6481, 84.9881, users[0].id]
    );

    console.log('✓ Projects created');

    // Create test tenders
    const tenderId1 = generateId();
    const tenderId2 = generateId();

    await run(
      `INSERT INTO tenders (id, title, description, category, estimatedBudget, publishDate, closingDate, status, projectId, state, district, block, createdBy, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [tenderId1, 'School Construction Tender', 'Inviting bids for school building construction', 'Construction', 5000000, '2024-01-01', '2024-02-15', 'published', projectId1, 'Bihar', 'Patna', 'Patna City', users[0].id]
    );

    await run(
      `INSERT INTO tenders (id, title, description, category, estimatedBudget, publishDate, closingDate, status, projectId, state, district, block, createdBy, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [tenderId2, 'Road Construction Tender', 'Inviting bids for road construction', 'Infrastructure', 10000000, '2024-02-01', '2024-03-15', 'published', projectId2, 'Bihar', 'Patna', 'Patna Sahib', users[0].id]
    );

    console.log('✓ Tenders created');

    // Create test funds
    const fundId1 = generateId();

    await run(
      `INSERT INTO funds (id, fromLevel, toLevel, amount, purposeType, releaseDate, status, releasedBy, releasedDate, projectId, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?, datetime('now'), datetime('now'))`,
      [fundId1, 'central', 'state', 5000000, 'project-execution', '2024-01-01', 'released', users[0].id, projectId1]
    );

    console.log('✓ Funds created');

    console.log('\n✅ Database seeded successfully!\n');
    console.log('Test Credentials:');
    console.log('================');
    console.log('Central Admin: central@samadhan.gov.in / password123');
    console.log('State Officer: state@samadhan.gov.in / password123');
    console.log('Block Manager: block@samadhan.gov.in / password123');
    console.log('Agency: agency@samadhan.gov.in / password123');
    console.log('Field Officer: fieldofficer@samadhan.gov.in / password123');
    console.log('IVA Officer: ivaofficer@samadhan.gov.in / password123');
    console.log('================\n');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
