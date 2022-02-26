# Light-weight Async web scraper written in JS
A minimal, comprehensive and object-oriented web scraper written in JS.
It is an extremely light-weight package made up of only 2 classes. It will do the boring stuff for you, e.g. http-requests and html-parsing; and you can just focus on extracting the desired data.
## Installation

Clone the repo and install dependencies using npm.

```bash
git clone https://github.com/iminsightman/minimal-flexible-js-scraper
cd minimal-flexible-js-scraper
npm install
```


## Usage
The package contains 2 classes: `ScraperAgent` and `ScraperProcessor`<br>
As the names might imply, `ScraperAgent` is the main class, it can fetch, and parse web-pages. As for data extraction, that is the job of `ScraperProcessor`; You can attach as many as `ScraperProcessor` instances to a single `ScraperAgent` instance. `ScraperProcessor` uses the power of `JQuery` to extract any desired data. You can pass JQuery selector strings to `ScraperProcessor`'s constructor.
<br><br>
Enough talking. let's see a simple example. This code will extract the movie names and their release years from IMDB's top 250 movies page:
<br>
```js
let agent = new ScraperAgent();
agent.scrap("https://www.imdb.com/chart/top/?ref_=nv_mv_250", [
  new ScraperProcessor(".titleColumn > a", true),
  new ScraperProcessor(".titleColumn > .secondaryInfo", true)
]).then((scraped) => {
  for (let i=0; i<scraped[0].length; i++) {
    console.log(scraped[0][i]+" "+scraped[1][i]);
  };
});
```
And the results will be printed on the console:
```
Scraped: https://www.imdb.com/chart/top/?ref_=nv_mv_250
Processed 250 results.
Processed 250 results.
The Shawshank Redemption (1994)
The Godfather (1972)
The Godfather: Part II (1974)
The Dark Knight (2008)
12 Angry Men (1957)
Schindler's List (1993)
The Lord of the Rings: The Return of the King (2003)
...
```
I have included more examples inside the `examples` folder.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
