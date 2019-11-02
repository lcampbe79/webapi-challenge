module.exports = validateProject;

function validateProject(req, res, next) {
  const validProject = req.body;
  if(!validProject) {
    return res.status(400).json({message: "No project data provided." }) 
  } else if (!validProject.description) {
      return res.status(400).json({message: "Missing project description."})
  } else if (!validProject.name) {
    return res.status(400).json({message: "Missing project name."})
  }

  next();
}