const ScraperAgent = require('./ScraperAgent.js');
const ScraperProcessor = require('./ScraperProcessor.js');

// Just a simple class for saving the results to a json file
class DatasetCollector {
    constructor(name) {
        this.name = name;
        this.filename = name + ".json";
        this.records = [];
        this.fs = require('fs');
        this.fs.writeFileSync(this.filename, JSON.stringify(this.records));
    }
    collect(record) {
        const data = this.fs.readFileSync(this.filename, { encoding: 'utf8', flag: 'r' });
        this.records = JSON.parse(data);
        this.records.push(record);
        this.fs.writeFileSync(this.filename, JSON.stringify(this.records, null, 4));
    }
}
let agent = new ScraperAgent(true);
let dataset = new DatasetCollector("test");

agent.scrap("https://www.imdb.com/chart/top/?ref_=nv_mv_250", new ScraperProcessor(".titleColumn > a", false, "href")).then((movieLinks) => {
    movieLinks.forEach((movieLink) => {
	dataset.collect(movieLink);
    });
});
