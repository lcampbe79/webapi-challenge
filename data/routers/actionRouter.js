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

router.get('/:id', validateProjectId, validatedActionId, (req, res) => {
  res.status(200).json(req.action)
});

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

function validateProjectId(req, res, next) {
  const projectId = req.params.id;
  if(!projectId) {
    return res.status(404).json({message: `No project id`})
  } 
  projectDb.get(projectId)
    .then(project => {
       if (!project) {
         return res.status(404).json({message: "No project id found."})
       } else {
         req.project = project;
         next()
       }
    })
    .catch(err => res.status(500).json({message: "Server error retrieving id"}))
}

module.exports = router;