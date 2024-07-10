const { readFile } = require('fs/promises');
const User = require('./user');
const { error } = require('./constantes')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id", "name", "professional", "age"]
}

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath);
        const validation = File.isValid(content)
        if (!validation.valid) throw new Error(validation.error)
        const users = File.parseCSVToJSON(content)
        return users;
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString('utf-8');
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...fileWithoutHeader] = csvString.trim().split('\n');
        const isHeaderValid = header.trim() == options.fields.join(',');

        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        const isContentLengthAccepted = (
            fileWithoutHeader.length > 0 && fileWithoutHeader.length <= options.maxLines
        )
        if (!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
        return { valid: true }
    }

    static parseCSVToJSON(csvString) {
        const lines = csvString.split('\n');
        // remove o primeiro item e joga na variável
        const firstLine = lines.shift();
        const header = firstLine.split(',').map(item => item.trim());
        const users = lines.map(line => {
            const columns = line.split(',').map(item => item.trim())
            let user = {}
            for (const index in columns) {
                user[header[index]] = columns[index];
            }
            return new User(user)
        })
        return users;
    }
}

(async () => {
    //const result = await File.csvToJson('./../mocks/threeItems-valid.csv');
    //const result = await File.csvToJson('./../mocks/fourItems-invalid.csv');
    //const result = await File.csvToJson('./../mocks/invalid-header.csv');
    //const result = await File.csvToJson('./../mocks/emptyFile-invalid.csv');

    //console.log('result', result)

})();

module.exports = File