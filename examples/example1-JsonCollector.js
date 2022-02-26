const ScraperAgent = require('../ScraperAgent.js');
const ScraperProcessor = require('../ScraperProcessor.js');
const JsonCollector = require('../JsonCollector.js');

let agent = new ScraperAgent();
let dataset = new JsonCollector("example-results");
agent.scrap("https://www.imdb.com/chart/top/?ref_=nv_mv_250", [
  new ScraperProcessor(".titleColumn > a", true),
  new ScraperProcessor(".titleColumn > .secondaryInfo", true)
]).then((scraped) => {
  for (let i=0; i<scraped[0].length; i++) {
    dataset.collect(scraped[0][i]+" "+scraped[1][i]);
    console.log(scraped[0][i]+" "+scraped[1][i]);
  };
});
