const cheerio = require('cheerio');
const axios = require('axios');

function removenewlines(str) {
  return str.replace(/\s+/g, ' ').trim();
}

function listing(type, $) {
  let spare = [];
  type.each((index, el) => {
    const cleanedText = removenewlines($(el).text());
    if (cleanedText && cleanedText.trim().length > 0) {
      spare.push(`\n ${index + 1}` + " )  " + `${removenewlines($(el).text())}`);
    }
  });
  if (spare.length > 0) {
    return spare.join('\n');
  }
  else {
    return null
  }
}

async function scrape(url, array) {
  const res = await axios.get(url);
  const html = res.data;
  const $ = cheerio.load(html);

  const body = listing($('body'), $);  // 1
  const headings = [$('h1'), $('h2'), $('h3'), $('h4'), $('h5'), $('h6')]; // 2
  for (let i = 0; i < headings.length; i++) {
    headings[i] = listing(headings[i], $);
  }
  const paragraphs = listing($('p'), $);  //3
  const articles = listing($('article'), $); //4

  const lists = [];
  $('ul, ol').each((index, el) => {
    const listItems = [];
    // Find all 'li' elements within the current 'ul' or 'ol'
    $(el).find('li').each((i, listItem) => {
      const cleanedItem = removenewlines($(listItem).text());
      if (cleanedItem) {
        listItems.push(`  - ${cleanedItem}`); // Indent list items for clarity
      }
    });

    // Only add the list if it contains valid items
    if (listItems.length > 0) {
      lists.push(`${index + 1}) List:\n${listItems.join('\n')}`);
    }
  });


  const links = [];  //6
  let ind = 0;
  $('a').each((index, el) => {
    const link = $(el).attr('href')
    if (link && link.startsWith('http')) {
      ind++;
      links.push(`\n ${ind} )  ${$(el).attr('href')}`);
    }
  });
  const final = { 'BODY': null, 'HEADINGS': null, 'LINKS': null, 'PARAGRAPHS': null, 'ARTICLES': null, 'LISTS': null };
  if (array[0] == 1) {
    final.BODY = body;
  }
  if (array[1] == 1) {
    final.HEADINGS = headings.join('\n');
  }
  if (array[2] == 1) {
    final.LINKS = links.join('\n');

  }
  if (array[3] == 1) {
    final.PARAGRAPHS = paragraphs;
  }
  if (array[4] == 1) {
    final.ARTICLES = articles;
  }
  if (array[5] == 1) {
    final.LISTS = lists.join('\n');
  }
  return final;
}
////////////////////////////////////////////////////////////////////////
const scraper = async (req, res) => {
  console.log('reached');
  const { url, array } = req.body;


  try {
    const data = await scrape(url, array);
    res.send(JSON.stringify(data));
  } catch (err) {
    res.status(500).send('Error scraping the page');
  }
};

module.exports = { scraper };  