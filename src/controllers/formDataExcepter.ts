const formDataExcepter = (fn) => {
  return (req, res, next) => {
    if (
      (req.path === "/posts" && req.method === "POST") ||
      (req.path === "/posts/:id" && req.method === "POST")
    ) {
      next();
    } else {
      fn(req, res, next);
    }
  };
};

export default formDataExcepter;
