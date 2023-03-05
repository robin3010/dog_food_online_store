import { getGoodsByIds, getGoodsList, getProductById } from './apiMethods/goodsMethods';
import { signIn, signUp } from './apiMethods/loginMethods';
import { addNewProductReview, deleteProductReview, getProductReviews } from './apiMethods/reviewsMethods';
import { editUserInfo, getUserInfo } from './apiMethods/userInfoMethods';
import { addNewProduct, deleteProduct, editProduct } from './apiMethods/userProductMethods';

/* eslint-disable class-methods-use-this */
const BASE_URL = 'https://api.react-learning.ru';

class ShopApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
    this.search = '';
    this.signIn = signIn;
    this.signUp = signUp;
    this.getUserInfo = getUserInfo;
    this.editUserInfo = editUserInfo;
    this.getGoodsList = getGoodsList;
    this.getProductById = getProductById;
    this.getGoodsByIds = getGoodsByIds;
    this.getProductReviews = getProductReviews;
    this.addNewProductReview = addNewProductReview;
    this.deleteProductReview = deleteProductReview;
    this.addNewProduct = addNewProduct;
    this.editProduct = editProduct;
    this.deleteProduct = deleteProduct;
  }

  setSearch(search) {
    this.search = search;
  }

  getAuthHeader(authToken) {
    return `Bearer ${authToken}`;
  }

  checkFetchErrors({ settled } = false) {
    if (this.status === 400) {
      throw new Error('Некорректный запрос');
    }
    if (this.status === 401) {
      throw new Error('E-mail или пароль указаны неверно');
    }
    if (this.status === 404 && !settled) {
      throw new Error(`Ошибка. Код ${this.status} ${this.statusText}`);
    }
    if (this.status === 409) {
      throw new Error('Пользователь с таким email уже существует');
    }
    if (this.status > 499) {
      throw new Error(`${this.statusText}. Код ${this.status}`);
    }
    if (this.status > 401 && !settled) {
      throw new Error(`Ошибка авторизации. Код ${this.status} ${this.statusText}`);
    }
  }

  checkAuthToken(authToken) {
    if (!authToken) throw new Error('Вы не авторизованы');
  }
}

export const shopApi = new ShopApi({ baseUrl: BASE_URL });
