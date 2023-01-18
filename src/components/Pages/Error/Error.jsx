import clsx from 'clsx';
import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className={clsx(
        'd-flex',
        'flex-column',
        'justify-content-center',
        'align-items-center',
        'vh-100',
      )}
    >
      <h1>Ой, что-то пошло не так :(</h1>
      <p>Возникла непредвиденная ошибка.</p>
      <p>Вернуться на Главную</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}