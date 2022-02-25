class ScraperAgent {
    constructor(dynamic = false, n = 10) {
        this.fetch = require("node-fetch");
        this.dynamic = dynamic;
        this.n = n;
        this.runs = 0;
        this.randomUseragent = require('random-useragent');
        this.userAgent = this.randomUseragent.getRandom();
    }
    getUserAgent() {
        if (this.dynamic && this.runs == this.n) {
            this.runs = 0;
            this.userAgent = this.randomUseragent.getRandom();
        }
        return this.userAgent
    }
    async scrap(target, processors) {
        this.runs = this.runs + 1;
        var options = {
          method: 'GET',
          headers: { 'User-Agent': this.getUserAgent() }
        };
        let response = await this.fetch(target, options).catch((error) => {
            console.log(error);
        });
        if (response != null && response.ok){
          console.log('Scraped: '+target);
          let text = await response.text();
          if (Array.isArray(processors)){
            Object.keys(processors).forEach(async (key) => {
              const processor = processors[key];
              await processor.process(text);
              processors[key] = processor.scraped;
            });
            return processors;
          }
          await processors.process(text);
          return processors.scraped;
        }
        console.log('Failed: '+target);
        return new Array();
    }
}
module.exports = ScraperAgent;
