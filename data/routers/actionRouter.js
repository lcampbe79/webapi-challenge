const express = require('express');

const router= express.Router();
const actionDb = require('../helpers/actionModel');
const projectDb = require('../helpers/projectModel');

router.get('/', (req, res) => {
  actionDb.get()
    .then((actions) => {
      res.status(200).json(actions)
    })
    .catch(error => {
      res.status(500).json({message: "not found"})
  
    })
})

router.get('/:id', validatedActionId, (req, res) => {
  res.status(200).json(req.action)
});

router.post('/', ValidatedAction, validateProjectId, (req, res) => {
  actionDb.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding the project."})
  }) 
});

router.put('/:id', ValidatedAction, validatedActionId, validateProjectId, (req, res) => {
  const id = req.params.id
  actionDb.update(id, req.body)
    .then(updatedAction => {
      res.status(200).json(updatedAction)
    })
    .catch(err => {
      res.status(500).json({message: "Error updating the action."})
    })
})

router.delete('/:id', validatedActionId, (req, res) => {
  actionDb.remove(req.action.id)
    .then(response => res.sendStatus(204))
    .catch(err=> res.status(500).json({error: "The action with the id could not be retrieved."}))
})

function validatedActionId(req, res, next) {
  const actionId = req.params.id;
  if(!actionId) {
    return res.status(404).json({message: `No action id`})
  } 
  actionDb.get(actionId)
    .then(action => {
       if (!action) {
         return res.status(404).json({message: "No action id found."})
       } else {
         req.action = action;
         next()
       }
    })
    .catch(err => res.status(500).json({message: "Server error retrieving action id"}))
}

function ValidatedAction(req, res, next) {
  const validAction = req.body;
  if(!validAction) {
    return res.status(400).json({message: "No action data provided." }) 
  } else if (!validAction.description) {
      return res.status(400).json({message: "Missing action description."})
  } else if (!validAction.notes) {
    return res.status(400).json({message: "Missing action notes."})
  }

  next();
}

function validateProjectId(req, res, next) {
  const projectId = req.body.project_id;
  if(!projectId) {
    return res.status(404).json({message: `No project id`})
  } 
  projectDb.get(projectId)
    .then(project => {
       if (!project) {
         return res.status(404).json({message: `project id ${projectId} not found.`})
       } else {
         req.project = project;
         next()
       }
    })
    .catch(err => res.status(500).json({message: "Server error retrieving id"}))
}

module.exports = router;