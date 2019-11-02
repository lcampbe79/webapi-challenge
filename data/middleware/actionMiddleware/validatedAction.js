module.exports = validatedAction;

function validatedAction(req, res, next) {
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