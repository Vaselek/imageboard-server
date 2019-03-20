const fs = require('fs');
const fileName = './db.json'

let data = [];

module.exports = {
    init() {
        try {
            const fileContent = fs.readFileSync(fileName);
            data = JSON.parse(fileContent);
        } catch (e) {
            data = [];
        }
    },
    getItems() {
        return data;
    },
    addItem(item) {
        data.push(item);
        this.save();
    },
    save() {
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    }
};
