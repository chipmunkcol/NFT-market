export const pinStart = encodeURIComponent("20240617");

// home-page
export const homeNftUrl = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&metadata[keyvalues]={"nftPrice":{"value":"0","op":"gt"},"numberOfSales":{"value":"0","op":"gt"},"isCollection":{"value":"false","op":"eq"}}`;

export const homeCollectionUrl = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&metadata[keyvalues]={"numberOfSales":{"value":"0","op":"gt"},"isCollection":{"value":"true","op":"eq"},"isHide":{"value":"false","op":"eq"}}`;

// marketplace-page
export const marketplaceNftUrl = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&pageLimit=1000&metadata[keyvalues]={"nftPrice":{"value":"0","op":"gt"},"isCollection":{"value":"false","op":"eq"}}`;
export const marketplaceNftqueryUrl = (encodedSearchQuery) => {
  return `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&pageLimit=1000&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"nftPrice":{"value":"0","op":"gt"},"isCollection":{"value":"false","op":"eq"}}`;
};
export const marketplaceNftCategoryUrl = (encodedCategory) => {
  return `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&pageLimit=1000&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"nftPrice":{"value":"0","op":"gt"},"isCollection":{"value":"false","op":"eq"}}`;
};
