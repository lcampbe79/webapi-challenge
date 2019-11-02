module.exports = validateProjectId;

const projectDb = require('../../helpers/projectModel')

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