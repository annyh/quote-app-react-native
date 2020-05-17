const getTitleFromId = (id, prefix) => id.substring(id.indexOf('/') + 1, id.length);

const processResults = (obj, allData) => {
    if (!obj.hasOwnProperty('quotes') || !allData) {
        return;
    }

    // get all quotes
    const favoriteQuotes = allData.reduce((acc, curr) => {
        acc = [...acc, ...curr.quotes]; return acc;
    }, []);
    obj.quotes.forEach((obj) => {
        obj.isFavorite = favoriteQuotes.includes(obj.quote);
    });
    return obj;
}

export { getTitleFromId, processResults };