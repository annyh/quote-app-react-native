const getTitleFromId = (id, prefix) => id.substring(id.indexOf('/') + 1, id.length);
export { getTitleFromId };