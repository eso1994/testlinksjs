#!/usr/bin/env node

const validateURL = require('./testURL')
const takeFile = require('./index')

const path = process.argv

async function textProcess(pathFile) {
    const result = await takeFile(pathFile[2])
    if(pathFile[3] === 'validate'){
        console.log('validateLinks', await validateURL(result))
    }else{
        console.log('Links list', result)
    }
    
}

textProcess(path)