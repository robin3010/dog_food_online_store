/* eslint-disable class-methods-use-this */
const BASE_URL = 'https://api.react-learning.ru';

class ShopApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
    this.search = '';
  }

  setSearch(search) {
    this.search = search;
  }

  getAuthHeader(authToken) {
    return `Bearer ${authToken}`;
  }

  getSearchQuery() {
    return `/search?query=${this.search}`;
  }

  checkFetchErrors() {
    if (this.status === 400) {
      throw new Error('Некорректный запрос');
    }
    if (this.status === 401) {
      throw new Error('E-mail или пароль указаны неверно');
    }
    if (this.status === 409) {
      throw new Error('Пользователь с таким email уже существует');
    }
    if (this.status > 499) {
      throw new Error(`${this.statusText}. Код ${this.status}`);
    }
    if (this.status > 401) {
      throw new Error(`Ошибка авторизации. Код ${this.status} ${this.statusText}`);
    }
  }

  checkAuthToken(authToken) {
    if (!authToken) throw new Error('Вы не авторизованы');
  }

  async signIn(userData) {
    const fetchSignIn = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    this.checkFetchErrors.call(fetchSignIn);

    const response = await fetchSignIn.json();
    return response;
  }

  async signUp(userData) {
    const fetchSignUp = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    this.checkFetchErrors.call(fetchSignUp);
  }

  async getUserInfo(authToken, group) {
    this.checkAuthToken(authToken);

    const fetchUserInfo = await fetch(`${this.baseUrl}/v2/${group}/users/me`, {
      headers: {
        authorization: this.getAuthHeader(authToken),
      },
    });

    this.checkFetchErrors.call(fetchUserInfo);

    const userInfo = await fetchUserInfo.json();
    return userInfo;
  }

  async editUserInfo(authToken, group, editedData) {
    this.checkAuthToken(authToken);

    const editUserInfo = await fetch(`${this.baseUrl}/v2/${group}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.getAuthHeader(authToken),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    });

    this.checkFetchErrors.call(editUserInfo);

    const editedUserInfo = await editUserInfo.json();
    return editedUserInfo;
  }

  async getGoodsList(authToken) {
    this.checkAuthToken(authToken);

    const searchQuery = this.search && this.getSearchQuery();

    const fetchGoodsList = await fetch(`${BASE_URL}/products${searchQuery}`, {
      headers: {
        authorization: this.getAuthHeader(authToken),
      },
    });

    this.checkFetchErrors.call(fetchGoodsList);

    const response = await fetchGoodsList.json();

    if (searchQuery) return response;
    return response.products;
  }

  async getProductById(productId, authToken) {
    this.checkAuthToken(authToken);

    const fetchProductById = await fetch(`${BASE_URL}/products/${productId}`, {
      headers: {
        authorization: this.getAuthHeader(authToken),
      },
    });

    this.checkFetchErrors.call(fetchProductById);

    const response = await fetchProductById.json();
    return response;
  }

  async getGoodsByIds(goodsIds, authToken) {
    const fetchGoodsById = await Promise.all(
      goodsIds.map((id) => this.getProductById(id, authToken)),
    );
    return fetchGoodsById;
  }
}

export const shopApi = new ShopApi({ baseUrl: BASE_URL });
