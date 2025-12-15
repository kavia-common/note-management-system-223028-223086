const notesService = require('../services/notes');

// PUBLIC_INTERFACE
function listNotes(req, res, next) {
  try {
    const data = notesService.list();
    return res.status(200).json({ success: true, data });
  } catch (e) {
    return next(e);
  }
}

// PUBLIC_INTERFACE
function getNote(req, res, next) {
  try {
    const { id } = req.params;
    const note = notesService.get(id);
    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    return res.status(200).json({ success: true, data: note });
  } catch (e) {
    return next(e);
  }
}

// PUBLIC_INTERFACE
function createNote(req, res, next) {
  try {
    const note = notesService.create(req.body);
    return res.status(201).json({ success: true, data: note });
  } catch (e) {
    if (e.status === 400) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: e.details });
    }
    return next(e);
  }
}

// PUBLIC_INTERFACE
function updateNote(req, res, next) {
  try {
    const { id } = req.params;
    const note = notesService.update(id, req.body);
    return res.status(200).json({ success: true, data: note });
  } catch (e) {
    if (e.status === 400) {
      return res.status(400).json({ success: false, error: 'Validation failed', details: e.details });
    }
    if (e.status === 404) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    return next(e);
  }
}

// PUBLIC_INTERFACE
function deleteNote(req, res, next) {
  try {
    const { id } = req.params;
    notesService.delete(id);
    return res.status(204).send();
  } catch (e) {
    if (e.status === 404) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }
    return next(e);
  }
}

module.exports = {
  listNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
