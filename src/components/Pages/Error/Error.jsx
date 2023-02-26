import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="
        d-flex
        flex-column
        justify-content-center
        align-items-center
        vh-100"
    >
      <h1>Ой, что-то пошло не так :(</h1>
      <p>Возникла непредвиденная ошибка.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <a href="./" style={{ textDecoration: 'none' }}>Вернуться на Главную</a>
    </div>
  );
}
