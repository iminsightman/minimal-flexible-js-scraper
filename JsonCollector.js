// Just a simple class for saving the results to a json file
class JsonCollector {
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
module.exports = JsonCollector;
