const { error } = require('./src/constantes');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');


(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [
            {
                "id": 123,
                "name": "Erick Wendel",
                "professional": "Javascript Instructor",
                "birthDay": 1999
            },
            {
                "id": 321,
                "name": "Xuxa da Silva",
                "professional": "Javascript Specialist",
                "birthDay": 1934
            },
            {
                "id": 231,
                "name": "Joaozinho",
                "professional": "Java Developer",
                "birthDay": 1994
            }
        ]

        console.log('expected', JSON.stringify(expected))
        console.log('result', JSON.stringify(result))

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }

})()