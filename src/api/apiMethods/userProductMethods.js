export async function addNewProduct(authToken, newProduct) {
  const addProduct = await fetch(`${this.baseUrl}/products`, {
    method: 'POST',
    headers: {
      authorization: this.getAuthHeader(authToken),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });

  this.checkFetchErrors.call(addProduct);

  const response = await addProduct.json();
  return response;
}

export async function editProduct(authToken, productId, editedProduct) {
  const editProductFetch = await fetch(`${this.baseUrl}/products/${productId}`, {
    method: 'PATCH',
    headers: {
      authorization: this.getAuthHeader(authToken),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedProduct),
  });

  this.checkFetchErrors.call(editProductFetch);

  const response = await editProductFetch.json();
  return response;
}

export async function deleteProduct(authToken, productId) {
  const deleteProductFetch = await fetch(`${this.baseUrl}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      authorization: this.getAuthHeader(authToken),
    },
  });

  this.checkFetchErrors.call(deleteProductFetch);

  const response = await deleteProductFetch.json();
  return response;
}
