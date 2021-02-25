export const truncate = (source, limit) => {
    return source.length > limit ? source.slice(0, limit -1) + "...": source
}