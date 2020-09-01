const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

//CSV file headers

$('#submit').on('click', function(e) {
  e.preventDefault()
  const textareaString = $('textarea').val()
  //Separating entered links by comma
  const commaSeparatedLinks = textareaString.split(',')

  commaSeparatedLinks.forEach(link => {
    async function getData() {
      const tags = []

      //Checked Checkbox Tags
      $.each($('input[type="checkbox"]:checked'), function() {
        tags.push($(this).val())
      })

      //Api call to links
      await axios.get(`${link}`).then(res => {
        const $ = cheerio.load(res.data)
        const header = ['h1','h2','h3','h4','h5','h6']

        //Looping on tags
        tags.forEach(selectedTags => {
          $(selectedTags).each((ind, el) => {

            if(header.indexOf(el.tagName) > -1) {
              console.log(`<${el.tagName}>${$(el).text()}</${el.tagName}>`)
            }

            if(el.tagName === 'a') {
              console.log(`<a href='${$(el).attr('href')}'>${$(el).text()}</a>`)
            }

            if(el.tagName === 'img') {
              console.log(`<img src='${$(el).attr('src')}' alt='${$(el).attr('alt')}'/>`)
            }

            if(el.tagName === 'link') {
              if ($(el).attr('rel') === 'canonical') {
                console.log(`<link rel='canonical' href='${$(el).attr('href')}'/>`)
              }
            }
            
            if(el.tagName === 'meta') {
              if($(el).attr('name')) {
                console.log(`<meta name='${$(el).attr('name')}' content='${$(el).attr('content')}'/>`)
              } else if($(el).attr('property')){
                console.log(`<meta property='${$(el).attr('property')}' content='${$(el).attr('content')}'/>`)
              }              
            }
          })
        })
      })
    }
    getData()
  })
})