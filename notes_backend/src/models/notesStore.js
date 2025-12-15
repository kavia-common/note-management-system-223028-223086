const fs = require('fs');
const path = require('path');

// Simple file-backed in-memory store for notes
// Each note: { id: string, title: string, content: string, createdAt: ISOString, updatedAt: ISOString }

const DATA_DIR = path.join(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'notes.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ notes: [] }, null, 2), 'utf-8');
  }
}

// Load notes from file
function load() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.notes) ? parsed.notes : [];
  } catch (e) {
    // If corrupt, reset file
    fs.writeFileSync(DATA_FILE, JSON.stringify({ notes: [] }, null, 2), 'utf-8');
    return [];
  }
}

// Save notes to file
function save(notes) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify({ notes }, null, 2), 'utf-8');
}

module.exports = {
  load,
  save,
};
