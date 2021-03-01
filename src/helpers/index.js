export const truncate = (source, limit) => {
    return source.length > limit ? source.slice(0, limit -1) + "...": source
}

export const checkIfExists = (source, inCaseNoData) => {

    if(source.length == 0) {
        return inCaseNoData
    }

    return source
    // if(source.length > 0) return source


    // return inCaseNoData
}