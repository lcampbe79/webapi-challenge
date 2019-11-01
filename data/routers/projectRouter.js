const express = require('express');

const router = express.Router();
const projectDb = require('../helpers/projectModel');



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
})

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