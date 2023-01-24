const BASE_URL = 'https://api.react-learning.ru';

class ShopApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
    this.authToken = '';
    // this.userName = '';
    // this.userId = '';
    // this.userGroup = '';
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  getAuthHeader() {
    return `Bearer ${this.authToken}`;
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

  checkAuthToken() {
    if (!this.authToken) throw new Error('Вы не авторизованы');
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

    // this.userName = response.data.name;
    // this.userId = response.data._id;
    // this.userGroup = response.data.group;

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

  // пока не используется
  async getUserInfo(group, property) {
    this.checkAuthToken();

    const fetchUserInfo = await fetch(`${this.baseUrl}/v2/${group}/users/me`, {
      headers: {
        authorization: this.getAuthHeader(),
      },
    });

    // this.checkFetchErrors.call(fetchUserInfo);

    const userInfo = await fetchUserInfo.json();

    if (property) {
      console.log(userInfo[property]);
      return userInfo[property];
    }
    console.log(userInfo);
    return userInfo;
  }

  async getGoodsList() {
    this.checkAuthToken();

    const fetchGoodsList = await fetch(`${BASE_URL}/products`, {
      headers: {
        authorization: this.getAuthHeader(),
      },
    });

    this.checkFetchErrors.call(fetchGoodsList);

    const { products } = await fetchGoodsList.json();
    return products;
  }
}

export const shopApi = new ShopApi({ baseUrl: BASE_URL });
