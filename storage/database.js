const fs = require('fs')

module.exports = {
    save(data, filename) {
        if (!filename.endsWith('.json')) {
            filename = filename + '.json'
        }
        fs.writeFileSync(filename, JSON.stringify(data))
    },

    load(filename) {
        if (!filename.endsWith('.json')) {
            filename = filename + '.json'
        }
        if (fs.existsSync(filename)) {
            return JSON.parse(fs.readFileSync(filename))
        }
        else {
            return []
        }
    }
}