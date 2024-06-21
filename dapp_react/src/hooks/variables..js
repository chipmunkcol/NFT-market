export const pinStart = encodeURIComponent("20240617");

export const homeNftUrl = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"numberOfSales":{"value":"0","op":"gt"},"isCollection":{"value":"false","op":"eq"}}`;

export const homeCollectionUrl = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"numberOfSales":{"value":"0","op":"gt"},"isCollection":{"value":"true","op":"eq"},"isHide":{"value":"false","op":"eq"}}`;

// sample pinata url
// const url = `https://api.pinata.cloud/data/pinList?
// pageLimit=${encodedLimit}&pinStart=${pinStart}&pageOffset=${encodedOffset}
// &metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
