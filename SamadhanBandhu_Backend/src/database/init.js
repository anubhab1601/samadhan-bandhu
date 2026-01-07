import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../data/samadhan.db');

let db = null;

export const getDatabase = () => {
  if (!db) {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Database connection error:', err);
      } else {
        console.log('Connected to SQLite database');
      }
    });
  }
  return db;
};

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    getDatabase().run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    getDatabase().get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    getDatabase().all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const initializeDatabase = async () => {
  try {
    // Users table
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        role TEXT NOT NULL,
        department TEXT,
        designation TEXT,
        state TEXT,
        district TEXT,
        block TEXT,
        village TEXT,
        phone TEXT,
        profilePicture TEXT,
        isActive BOOLEAN DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Projects table
    await run(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        state TEXT NOT NULL,
        district TEXT,
        block TEXT,
        village TEXT,
        category TEXT,
        budgetAmount REAL,
        allocatedFunds REAL DEFAULT 0,
        releasedFunds REAL DEFAULT 0,
        status TEXT DEFAULT 'planning',
        startDate DATE,
        endDate DATE,
        completionPercentage INTEGER DEFAULT 0,
        latitude REAL,
        longitude REAL,
        createdBy TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (createdBy) REFERENCES users(id)
      )
    `);

    // Tenders table
    await run(`
      CREATE TABLE IF NOT EXISTS tenders (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        estimatedBudget REAL,
        publishDate DATE,
        closingDate DATE,
        submissionDate DATE,
        status TEXT DEFAULT 'draft',
        projectId TEXT,
        state TEXT NOT NULL,
        district TEXT,
        block TEXT,
        createdBy TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (createdBy) REFERENCES users(id),
        FOREIGN KEY (projectId) REFERENCES projects(id)
      )
    `);

    // Tender Applications table
    await run(`
      CREATE TABLE IF NOT EXISTS tender_applications (
        id TEXT PRIMARY KEY,
        tenderId TEXT NOT NULL,
        agencyId TEXT NOT NULL,
        agencyName TEXT NOT NULL,
        proposedBudget REAL,
        documentUrl TEXT,
        status TEXT DEFAULT 'pending',
        submissionDate DATETIME,
        evaluationScore REAL,
        evaluatedBy TEXT,
        evaluationDate DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tenderId) REFERENCES tenders(id),
        FOREIGN KEY (agencyId) REFERENCES users(id)
      )
    `);

    // Funds table
    await run(`
      CREATE TABLE IF NOT EXISTS funds (
        id TEXT PRIMARY KEY,
        allocationId TEXT,
        fromLevel TEXT,
        toLevel TEXT,
        amount REAL,
        purposeType TEXT,
        releaseDate DATE,
        status TEXT DEFAULT 'pending',
        releasedBy TEXT,
        releasedDate DATETIME,
        approvedBy TEXT,
        approvedDate DATETIME,
        projectId TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (releasedBy) REFERENCES users(id),
        FOREIGN KEY (approvedBy) REFERENCES users(id),
        FOREIGN KEY (projectId) REFERENCES projects(id)
      )
    `);

    // Payments table
    await run(`
      CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY,
        projectId TEXT NOT NULL,
        agencyId TEXT NOT NULL,
        amount REAL NOT NULL,
        paymentType TEXT,
        status TEXT DEFAULT 'pending',
        invoiceNumber TEXT,
        paymentDate DATE,
        approvedBy TEXT,
        approvedDate DATETIME,
        transactionId TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (projectId) REFERENCES projects(id),
        FOREIGN KEY (agencyId) REFERENCES users(id),
        FOREIGN KEY (approvedBy) REFERENCES users(id)
      )
    `);

    // Inspections table
    await run(`
      CREATE TABLE IF NOT EXISTS inspections (
        id TEXT PRIMARY KEY,
        projectId TEXT NOT NULL,
        inspectorId TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        scheduledDate DATE,
        actualDate DATETIME,
        location TEXT,
        completionPercentage INTEGER,
        findings TEXT,
        recommendations TEXT,
        photoUrls TEXT,
        gpsCoordinates TEXT,
        reportUrl TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (projectId) REFERENCES projects(id),
        FOREIGN KEY (inspectorId) REFERENCES users(id)
      )
    `);

    // Notifications table
    await run(`
      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT,
        type TEXT,
        relatedId TEXT,
        relatedType TEXT,
        isRead BOOLEAN DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);

    // Reports table
    await run(`
      CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        reportType TEXT,
        period TEXT,
        submittedBy TEXT NOT NULL,
        submissionDate DATETIME,
        content TEXT,
        status TEXT DEFAULT 'pending',
        approvedBy TEXT,
        approvedDate DATETIME,
        fileUrl TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (projectId) REFERENCES projects(id),
        FOREIGN KEY (submittedBy) REFERENCES users(id),
        FOREIGN KEY (approvedBy) REFERENCES users(id)
      )
    `);

    // Broadcasts table
    await run(`
      CREATE TABLE IF NOT EXISTS broadcasts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        createdBy TEXT NOT NULL,
        targetRole TEXT,
        targetState TEXT,
        priority TEXT DEFAULT 'normal',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (createdBy) REFERENCES users(id)
      )
    `);

    // Verification Assignments table
    await run(`
      CREATE TABLE IF NOT EXISTS verification_assignments (
        id TEXT PRIMARY KEY,
        applicationId TEXT NOT NULL,
        assignedTo TEXT NOT NULL,
        assignedBy TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        assignedDate DATETIME,
        completionDate DATETIME,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (assignedTo) REFERENCES users(id),
        FOREIGN KEY (assignedBy) REFERENCES users(id)
      )
    `);

    // Audit Log table
    await run(`
      CREATE TABLE IF NOT EXISTS audit_log (
        id TEXT PRIMARY KEY,
        userId TEXT,
        action TEXT NOT NULL,
        resourceType TEXT,
        resourceId TEXT,
        changes TEXT,
        ipAddress TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};
