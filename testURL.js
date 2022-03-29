const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function errorHandler(err){
    throw new Error(err.message)
}

async function statusCheck(arrayURLs){
    try{
    const arrayStatus = await Promise
        .all(arrayURLs
            .map(async url => {
                const res = await fetch(url)
                return `${res.status} - ${res.statusText}`
    }))
    return arrayStatus
} catch(err) {
    errorHandler(err)
}
}

function makeURLsArrays(arrayLinks){
    return arrayLinks.map(objectLinks => Object.values(objectLinks).join())
}

async function validateURL(arrayLinks){
    const links =  makeURLsArrays(arrayLinks)
    const statusLink = await statusCheck(links)
    const result = arrayLinks.map((object, index) => ({
        ...object, status: statusLink[index] 
    }))
    return result
}

module.exports= validateURL