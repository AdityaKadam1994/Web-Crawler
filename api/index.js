const scrapUrl = require('./helper');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  try {
    const { urls, tags } = req.body;
    let collectData = await Promise.all(urls.map(async url => await scrapUrl(url, tags)))
    res.send(collectData)
  } catch (error) {
    res.status(500)
    const response = error.response || {}
    res.send({
      message: error.message,
      response
    })
  }
}
