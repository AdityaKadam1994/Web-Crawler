const axios = require('axios')
const cheerio = require('cheerio')

async function scrapUrl(url, tags) {
  //Api call to links
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data)
    let scrapData = {};
    // helper method to scrap data by tag and return in array
    const getTagData = tag => $(tag).text().split(/\n+/g).filter(el => el.trim() !== '').map(e => e.trim());
    // Iterate through each tag to collect data
    tags.forEach(tag => {
      if (tag === 'p') {
        let pTagData = getTagData(tag)
        scrapData[tag] = pTagData
      }
      if (tag === 'h1') {
        let h1TagDta = getTagData(tag)
        scrapData[tag] = h1TagDta
      }
      if (tag === 'h2') {
        let h2TagDta = getTagData(tag)
        scrapData[tag] = h2TagDta
      }
      if (tag === 'h3') {
        let h3TagDta = getTagData(tag)
        scrapData[tag] = h3TagDta
      }
      if (tag === 'h4') {
        let h4TagDta = getTagData(tag)
        scrapData[tag] = h4TagDta
      }
      if (tag === 'h5') {
        let h5TagDta = getTagData(tag)
        scrapData[tag] = h5TagDta
      }
      if (tag === 'h6') {
        let h6TagDta = getTagData(tag)
        scrapData[tag] = h6TagDta
      }
      if (tag === 'img') {
        let imgTagData = $(tag).attr('src')
        let alt = $(tag).attr('alt')
        scrapData[tag] = imgTagData
        scrapData['alt'] = alt
      }
      if (tag === 'a') {
        let aTagHref = $(tag).attr('href')
        console.log(aTagHref)
        let aTagText = getTagData(tag);
        scrapData[tag] = aTagText
      }
      if (tag === 'meta') {
        metaKeys = {
          'description': null,
          'keywords': null,
          'author': null,
          'viewport': null,
          'og:type': null,
          'og:title': null,
          'og:description': null,
          'og:image': null,
          'og:url': null,
          'twitter:title': null,
          'twitter:image': null,
          'twitter:description': null,
          'twitter:site': null,
          'twitter:creator': null,
          'twitter:card': null
        }
        for (let key in metaKeys) {
          metaKeys[key] = $(`meta[name='${key}']`).attr('content')
          metaKeys[key] = $(`meta[property='${key}']`).attr('content')
        }
        scrapData[tag] = metaKeys
      }
    })
    // returb scrapedata object as Promise
    return new Promise((resolve, reject) => {
      if (Object.keys(scrapData).length === 0 && scrapData.constructor === Object) {
        reject('Scrape data not found')
      } else {
        resolve({
          url,
          scrapData
        })
      }
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = scrapUrl;