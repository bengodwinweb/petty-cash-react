module.exports = app => {
  app.get('/api', (req, res) =>
    res.send({ greeting: 'Welcome to petty cash' })
  );
};
