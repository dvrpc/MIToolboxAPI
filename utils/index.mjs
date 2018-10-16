export const send = (
  err,
  result,
  transformFunc = result => result,
  req,
  res
) => {
  if (err) {
    res.send({ error: err.toString() });
  } else {
    res.send(transformFunc(result));
  }
};
