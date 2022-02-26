// This is a more complex example
// We will read the movie plots in addition to names and release years
const ScraperAgent = require('../ScraperAgent.js');
const ScraperProcessor = require('../ScraperProcessor.js');
const JsonCollector = require('../JsonCollector.js');
let agent = new ScraperAgent(true, 10);
let dataset = new JsonCollector("example2-results");
let descriptionProcessor = new ScraperProcessor("p[data-testid='plot'] > span:first-child", true);

agent.scrap("https://www.imdb.com/chart/top/?ref_=nv_mv_250", [
  new ScraperProcessor(".titleColumn > a", false, 'href'),
  new ScraperProcessor(".titleColumn > a", true),
  new ScraperProcessor(".titleColumn > .secondaryInfo", true)
]).then((scraped_first) => {
  let gap = 500; // we will schedule requests for every 500 ms.
  let t = 500;
  for (let i=0; i<scraped_first[0].length; i++) {
    const link = scraped_first[0][i]
    setTimeout(function(){
      agent.scrap("https://imdb.com"+link.substr(0, link.indexOf('?')), descriptionProcessor).then((scraped_desc) => {
        dataset.collect({'Name': scraped_first[1][i], 'Year': scraped_first[2][i], 'Plot': scraped_desc[0]})
      });
    }, t);
    t += gap;
  };
});
