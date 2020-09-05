const scrapUrl = require('./helper');

module.exports = async (req, res) => {
  try {
    const { urls, tags } = req.body;
    let collectData = await Promise.all(urls.map(async url => await scrapUrl(url, tags)))
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
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
