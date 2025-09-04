exports.validateBody = (req) => {
  if (req) {
    for (let field in req.body) {
      if (req.body[field] == " ") {
        return { emptyBody: true, fieldName: field };
        
      }
    }
    return { emptyBody: false, fieldName: "" };//everything is fine
  }
  return { emptyBody: true, fieldName: "body" };//field is missing
  
};
