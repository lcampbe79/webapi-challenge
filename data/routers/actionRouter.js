const express = require('express');

const router= express.Router();
const actionDb = require('../helpers/actionModel'); 

const validatedAction = require('../middleware/actionMiddleware/validatedAction')
const validatedProjectId = require('../middleware/actionMiddleware/validatedProjectId')
const validatedActionId = require('../middleware/actionMiddleware/validatedActionId')

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

router.post('/', validatedAction, validatedProjectId, (req, res) => {
  actionDb.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding the project."})
  }) 
});

router.put('/:id', validatedAction, validatedActionId, validatedProjectId, (req, res) => {
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

module.exports = router;