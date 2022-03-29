const fs = require('fs')
const { text } = require('express')

const errorHandler = (err) => {
    throw new Error(err.code)
}

function takeLinks(text){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
    const arrayResult = []
    let temp
    while((temp = regex.exec(text)) !== null) {
        arrayResult.push({ [temp[1]]: temp[2] })
    }
    return arrayResult.length === 0 ? 'there are no links' : arrayResult
}

async function takeFile(pathFile){
    const encoding = 'utf-8'
    try {
        const text = await fs.promises.readFile(pathFile, encoding)
        return takeLinks(text)
    } catch(err){
        errorHandler(err)
    }
}

module.exports = takeFile

//testando