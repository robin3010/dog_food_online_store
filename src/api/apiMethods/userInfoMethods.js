export async function getUserInfo(authToken, group) {
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

export async function editUserInfo(authToken, group, editedData, userPic = false) {
  this.checkAuthToken(authToken);

  console.log({ editedData, userPic });

  const patchAvatar = userPic ? '/avatar' : '';

  const patchUserInfo = await fetch(`${this.baseUrl}/v2/${group}/users/me${patchAvatar}`, {
    method: 'PATCH',
    headers: {
      authorization: this.getAuthHeader(authToken),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedData),
  });

  this.checkFetchErrors.call(editUserInfo);

  const editedUserInfo = await patchUserInfo.json();
  return editedUserInfo;
}
