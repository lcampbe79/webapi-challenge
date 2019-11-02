module.exports = validatedProjectId;

const projectDb = require('../../helpers/projectModel');

function validatedProjectId(req, res, next) {
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