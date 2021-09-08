export function filterData(doc) {
    return {
        type: 'FILTER_BOOKS',
        payload: doc
    }
}
