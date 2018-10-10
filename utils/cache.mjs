import cache from "memory-cache";

export default duration => (req, res, next) => {
  const key = req.originalUrl;
  const store = cache.get(key);
  res.set("Content-Type", "application/json");
  if (store) return res.send(store);
  res.origSend = res.send;
  res.send = body => {
    cache.put(key, body, duration * 1000);
    res.origSend(body);
  };
  next();
};
