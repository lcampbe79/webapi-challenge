const express = require('express');

const router = express.Router();
const projectDb = require('../helpers/projectModel');

const validateProject = require('../middleware/projectMiddleware/validateProject')
const validateProjectId = require('../middleware/projectMiddleware/validateProjectId')

router.get('/', (req, res) => {
  projectDb.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({message: "not found"})
    });
});

router.get('/:id', validateProjectId,(req,res) => {
  res.status(200).json(req.project)
});

router.post('/', validateProject, (req, res) => {
  projectDb.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding the project."})
  }) 
});

router.put('/:id', validateProject, validateProjectId, (req, res) => {
  const id = req.params.id
  projectDb.update(id, req.body)
    .then(updatedProject => {
      res.status(200).json(updatedProject)
    })
    .catch(err => {
      res.status(500).json({message: "Error updating the project."})
    })
})

router.delete('/:id', validateProjectId, (req, res) => {
  projectDb.remove(req.project.id)
    .then(response => res.sendStatus(204))
    .catch(err=> res.status(500).json({error: "The project with the id could not be retrieved."}))
})

// function validateProject(req, res, next) {
//   const validProject = req.body;
//   if(!validProject) {
//     return res.status(400).json({message: "No project data provided." }) 
//   } else if (!validProject.description) {
//       return res.status(400).json({message: "Missing project description."})
//   } else if (!validProject.name) {
//     return res.status(400).json({message: "Missing project name."})
//   }

//   next();
// }


module.exports = router;