const puppeteer = require('puppeteer');
const express = require('express');

const app = express();

app.get('/screenshot', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(req.query.url); // URL is given by the "user" (your client-side application)
  const screenshotBuffer = await page.screenshot();

  // Respond with the image
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': screenshotBuffer.length,
  });
  res.end(screenshotBuffer);

  await browser.close();
});

app.listen(4001);
app.get('/getAllMovies', async (req, res) => {
  const data = await scrape(
    'https://www.digitaltrends.com/movies/best-movies-on-netflix/'
  );

  res.json(data);
  // res.json({ answer: 42 });
});

app.get('/getBookCategories', async (req, res) => {
  const bookCategories = await scrapeBooks(
    'https://www.goodreads.com/choiceawards/best-books-2020'
  );

  console.log(bookCategories);
  res.json(bookCategories);
});

app.get('/getRandomBookByGenre', async (req, res) => {
  const book = await scrapeRandomBook(
    'https://www.goodreads.com/choiceawards/best-fiction-books-2020'
  );

  res.json(book);
});

const fs = require('fs');

async function scrape(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  var movies = await page.evaluate(() => {
    var titlesList = document.querySelectorAll('h3');
    var movieArr = [];
    for (var i = 0; i < titlesList.length; i++) {
      movieArr[i] = {
        title: titlesList[i].innerText.trim(),
      };
    }
    return movieArr;
  });
  debugger;
  console.log(movies);
  fs.writeFile('./netflixscrape.json', JSON.stringify(movies, null, 3), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Great Success');
  });

  browser.close();
  return movies;
}

async function scrapeBooks(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  var items = await page.evaluate(() => {
    var titlesList = document.querySelectorAll('h4');
    var itemArr = [];
    for (var i = 0; i < titlesList.length; i++) {
      itemArr[i] = {
        title: titlesList[i].innerText.trim(),
        link: titlesList[i].parentElement.href.trim(),
      };
    }
    return itemArr;
  });
  console.log(items);

  browser.close();
  return items;
}

async function scrapeRandomBook(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  var items = await page.evaluate(() => {
    var titlesList = document.getElementsByClassName('pollAnswer__bookLink');
    var itemArr = [];
    for (var i = 0; i < titlesList.length; i++) {
      itemArr[i] = {
        title: titlesList[i].lastChild.alt.trim(),
        link: titlesList[i].lastChild.src.trim(),
      };
    }
    return itemArr;
  });
  console.log(items);

  browser.close();
  return items;
}
