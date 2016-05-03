const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const request = require('request')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./src/public'));

const port = process.env.PORT || 3000

app.get('/images', (req, res) => {
  const base = 'http://api.giphy.com/v1/gifs/search?q='
  const query = req.body.search || 'cat';
  const apiKey = '&api_key=dc6zaTOxFJmzC'

  const url = base + query + apiKey

  const images = []

  request(url, function (error, response, giphy) {
    if (!error && response.statusCode == 200) {
      if (giphy.body && giphy.body.data) {
        images.push.apply(images, giphy.body.data)
      }
    }

    res.json(images)
  })
})

app.post('/search', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
