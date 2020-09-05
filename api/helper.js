const axios = require('axios')
const cheerio = require('cheerio')

async function scrapUrl(url, tags) {
  //Api call to links
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data)
    let scrapData = {};
    //It will remove circular dependancy
    function simpleStringify(object) {
      let simpleObject = [];
      for (let prop in object) {
        if (!object.hasOwnProperty(prop)) {
          continue;
        }
        if (typeof (object[prop]) == 'object') {
          continue;
        }
        if (typeof (object[prop]) == 'function') {
          continue;
        }
        simpleObject.push(object[prop]);
      }
      return JSON.stringify(simpleObject.slice(0, -1)); // returns cleaned up JSON
    };
    // helper method to scrap data by tag and return in array
    const getTagData = (tag, attr) => JSON.parse(simpleStringify($(tag).map((i, e) => attr ? $(e).attr(`${attr}`) : $(e).text())));
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
        let imgTagData = getTagData(tag, 'src')
        let alt = getTagData(tag, 'alt')
        scrapData[tag] = imgTagData
        scrapData['alt'] = alt
      }
      if (tag === 'a') {
        let aTagHref = getTagData(tag, 'href')
        let aTagText = getTagData(tag);
        scrapData['aLinks'] = aTagHref;
        scrapData[tag] = aTagText
      }
      if (tag === 'meta') {
        scrapData['metaName'] = getTagData(tag, 'name')
        scrapData['metaProperty'] = getTagData(tag, 'property')
        scrapData['metaContent'] = getTagData(tag, 'content')
      }
    })
    // return scrapedata object as Promise
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