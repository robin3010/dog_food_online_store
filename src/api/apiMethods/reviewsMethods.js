export async function getProductReviews(productId, authToken) {
  this.checkAuthToken(authToken);

  const fetchProductReviews = await fetch(`${this.baseUrl}/products/review/${productId}`, {
    headers: {
      authorization: this.getAuthHeader(authToken),
    },
  });

  this.checkFetchErrors.call(fetchProductReviews);

  const response = await fetchProductReviews.json();
  return response;
}

export async function addNewProductReview(productId, authToken, newReview) {
  this.checkAuthToken(authToken);

  const postNewProductReview = await fetch(`${this.baseUrl}/products/review/${productId}`, {
    method: 'POST',
    headers: {
      authorization: this.getAuthHeader(authToken),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReview),
  });

  this.checkFetchErrors.call(postNewProductReview);

  const response = await postNewProductReview.json();
  return response;
}

export async function deleteProductReview(productId, authToken, reviewId) {
  this.checkAuthToken(authToken);

  const deleteReview = await fetch(
    `${this.baseUrl}/products/review/${productId}/${reviewId}`,
    {
      method: 'DELETE',
      headers: {
        authorization: this.getAuthHeader(authToken),
      },
    },
  );

  this.checkFetchErrors.call(deleteReview);
}
