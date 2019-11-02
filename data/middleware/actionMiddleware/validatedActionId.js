module.exports = validatedActionId;

const actionDb = require('../../helpers/actionModel');

function validatedActionId(req, res, next) {
  const actionId = req.params.id;
  if(!actionId) {
    return res.status(404).json({message: `No action with this id was found`})
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