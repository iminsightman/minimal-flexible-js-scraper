class ScraperProcessor {
    constructor(selector, getText = false, attr = null, limit = 0) {
        this.selector = selector;
        this.getText = getText;
        this.attr = attr;
        this.jsdom = require("jsdom");
        this.limit = limit;
    }
    async process(body) {
        const { JSDOM } = this.jsdom;
        const dom = new JSDOM(body);
        const $ = (require('jquery'))(dom.window);
        //let's start extracting the data
        var scraped = new Array();
        if (this.getText) {
            const limit = this.limit;
            $(this.selector).each(function () {
                if (limit > 0 && scraped.length == limit)
                    return false;
                scraped.push($(this).text());
            });
        }
        else {
            const attribute = this.attr;
            const limit = this.limit;
            $(this.selector).each(function (index, element) {
                if (limit > 0 && limit == scraped.length)
                    return false;
                scraped.push($(element).attr(attribute));
            });
        }
        console.log('Processed '+scraped.length.toString()+' results.');
        this.scraped = scraped;;
    }
}
module.exports = ScraperProcessor;
