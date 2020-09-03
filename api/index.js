const scrapUrl = require('./helper');

module.exports = async (req, res) => {
  try {
    const { urls, tags } = req.body;
    let collectData = await Promise.all(urls.map(async url => await scrapUrl(url, tags)))
    res.send(collectData)
  } catch (error) {
    res.send(error)
  }
}
