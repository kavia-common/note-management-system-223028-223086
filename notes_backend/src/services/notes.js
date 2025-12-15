const crypto = require('crypto');
const store = require('../models/notesStore');

function genId() {
  return crypto.randomBytes(8).toString('hex');
}

function now() {
  return new Date().toISOString();
}

// Basic validation
function validateCreate(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    errors.push('Invalid payload.');
    return errors;
  }
  if (!payload.title || typeof payload.title !== 'string' || !payload.title.trim()) {
    errors.push('Title is required and must be a non-empty string.');
  }
  if (payload.content !== undefined && typeof payload.content !== 'string') {
    errors.push('Content must be a string if provided.');
  }
  return errors;
}

function validateUpdate(payload) {
  const errors = [];
  if (!payload || typeof payload !== 'object') {
    errors.push('Invalid payload.');
    return errors;
  }
  const hasTitle = Object.prototype.hasOwnProperty.call(payload, 'title');
  const hasContent = Object.prototype.hasOwnProperty.call(payload, 'content');
  if (!hasTitle && !hasContent) {
    errors.push('At least one of title or content must be provided.');
  }
  if (hasTitle && (typeof payload.title !== 'string' || !payload.title.trim())) {
    errors.push('Title must be a non-empty string when provided.');
  }
  if (hasContent && typeof payload.content !== 'string') {
    errors.push('Content must be a string when provided.');
  }
  return errors;
}

class NotesService {
  list() {
    return store.load();
  }

  get(id) {
    const notes = store.load();
    return notes.find(n => n.id === id) || null;
  }

  create(payload) {
    const errors = validateCreate(payload);
    if (errors.length) {
      const err = new Error('Validation failed');
      err.status = 400;
      err.details = errors;
      throw err;
    }
    const note = {
      id: genId(),
      title: payload.title.trim(),
      content: payload.content ?? '',
      createdAt: now(),
      updatedAt: now(),
    };
    const notes = store.load();
    notes.push(note);
    store.save(notes);
    return note;
  }

  update(id, payload) {
    const errors = validateUpdate(payload);
    if (errors.length) {
      const err = new Error('Validation failed');
      err.status = 400;
      err.details = errors;
      throw err;
    }
    const notes = store.load();
    const idx = notes.findIndex(n => n.id === id);
    if (idx === -1) {
      const err = new Error('Note not found');
      err.status = 404;
      throw err;
    }
    const existing = notes[idx];
    const updated = {
      ...existing,
      ...(Object.prototype.hasOwnProperty.call(payload, 'title') ? { title: payload.title.trim() } : {}),
      ...(Object.prototype.hasOwnProperty.call(payload, 'content') ? { content: payload.content } : {}),
      updatedAt: now(),
    };
    notes[idx] = updated;
    store.save(notes);
    return updated;
  }

  delete(id) {
    const notes = store.load();
    const idx = notes.findIndex(n => n.id === id);
    if (idx === -1) {
      const err = new Error('Note not found');
      err.status = 404;
      throw err;
    }
    const [removed] = notes.splice(idx, 1);
    store.save(notes);
    return removed;
  }
}

module.exports = new NotesService();
