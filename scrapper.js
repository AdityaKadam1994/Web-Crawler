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

      const selectedTable = $('#output-table')
      const selectedTableHeaders = $('#output-table thead tr')
      const selectedTableBody = $('#output-table tbody tr')
      //Api call to links
      
      await axios.get(`${link}`).then(res => {
        const $ = cheerio.load(res.data)
        const header = ['h1','h2','h3','h4','h5','h6']

        selectedTable.css('color','white')
        
        //Looping on tags
        tags.forEach((selectedTags, index) => {
          selectedTableHeaders.append(`<th>${selectedTags}</th>`)
          selectedTableBody.append('<td></td>')
          $(selectedTags).each((ind, el) => {

            if(header.indexOf(el.tagName) > -1) {
              selectedTableBody.find('td').eq(index).append(`${$(el).text()} <br><br>`)
              console.log(`<${el.tagName}>${$(el).text()}</${el.tagName}>`)
            }

            if(el.tagName === 'a') {
              selectedTableBody.find('td').eq(index).append(document.createTextNode(`<a href='${$(el).attr('href')}'>${$(el).text()}</a>`)).append('<br>')
              console.log(`<a href='${$(el).attr('href')}'>${$(el).text()}</a>`)
            }

            if(el.tagName === 'img') {
              selectedTableBody.find('td').eq(index).append(document.createTextNode(`<img src='${$(el).attr('src')}' alt='${$(el).attr('alt')}'/>`)).append('<br>')
              console.log(`<img src='${$(el).attr('src')}' alt='${$(el).attr('alt')}'/>`)
            }

            if(el.tagName === 'link') {
              if ($(el).attr('rel') === 'canonical') {
                selectedTableBody.find('td').eq(index).append(document.createTextNode(`<link rel='canonical' href='${$(el).attr('href')}'/>`)).append('<br>')
                console.log(`<link rel='canonical' href='${$(el).attr('href')}'/>`)
              }
            }
            
            if(el.tagName === 'meta') {
              if($(el).attr('name')) {
                selectedTableBody.find('td').eq(index).append(document.createTextNode(`<meta name='${$(el).attr('name')}' content='${$(el).attr('content')}'/>`)).append('<br>')
                console.log(`<meta name='${$(el).attr('name')}' content='${$(el).attr('content')}'/>`)
              } else if($(el).attr('property')){
                selectedTableBody.find('td').eq(index).append(document.createTextNode(`<meta property='${$(el).attr('property')}' content='${$(el).attr('content')}'/>`)).append('<br>')
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