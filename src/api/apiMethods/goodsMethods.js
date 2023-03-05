export async function getGoodsList(authToken) {
  this.checkAuthToken(authToken);

  const fetchGoodsList = await fetch(`${this.baseUrl}/products/search?query=${this.search}`, {
    headers: {
      authorization: this.getAuthHeader(authToken),
    },
  });

  this.checkFetchErrors.call(fetchGoodsList);

  const response = await fetchGoodsList.json();

  return response;
}

export async function getProductById(productId, authToken) {
  this.checkAuthToken(authToken);

  const fetchProductById = await fetch(`${this.baseUrl}/products/${productId}`, {
    headers: {
      authorization: this.getAuthHeader(authToken),
    },
  });

  this.checkFetchErrors.call(fetchProductById, { settled: true });

  if (fetchProductById.status > 401) {
    const errorResponse = await fetchProductById.json();
    return {
      ...errorResponse,
      id: productId,
    };
  }

  const response = await fetchProductById.json();
  return response;
}

export async function getGoodsByIds(goodsIds, authToken) {
  const fetchGoodsById = await Promise.allSettled(
    goodsIds.map((id) => this.getProductById(id, authToken)),
  );

  const fetchedValues = fetchGoodsById.map((response) => response.value);
  return fetchedValues;
}
