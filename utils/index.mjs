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

export const upsert = (collection, selector, document, req, res) => {
  collection.save(
    selector,
    document,
    { upsert: true, fullResult: true },
    (err, result) => send(err, result, r => {console.log(r.message.documents); return r.message.documents}, req, res)
  );
};
