import clsx from 'clsx';

export function ProductItem({ item }) {
  const {
    name,
    price,
    pictures,
    discount,
    quatity,
    available,
    // _id,
  } = item;

  // eslint-disable-next-line consistent-return
  const availableQuantity = () => {
    if (!available || quatity === 0) {
      return 'нет в наличии';
    }
    // if (quatity >= 20) {
    //   return 'Много';
    // }
    if (quatity >= 10) {
      return 'в наличии';
    }
    if (quatity >= 4) {
      return 'мало';
    }
    if (quatity > 0) {
      let str = 'осталось';
      if (quatity === 1) str = 'осталась';
      return `${str} ${quatity} шт.`;
    }
  };

  // const prod = {
  //   discount: 10,
  //   stock: 10,
  //   available: true,
  // eslint-disable-next-line max-len
  //   pictures: 'https://img.detmir.st/-7K4ihFCcSHbGCGhHi7I3IMxyJWwBH-E-zjtt1NfkX8/rs:fit:460:460/g:sm/el:1/aHR0cHM6Ly9zdGF0aWMuZGV0bWlyLnN0L21lZGlhX291dC81MzUvMTQ0LzMxNDQ1MzUvMTUwMC8wLmpwZz8xNjUyMjY0NTA5NTIx.webp',
  //   likes: [],
  //   tags: [],
  //   _id: '63cadd4059b98b038f77a8ac',
  //   name: 'Лакомство для собак Деревенские лакомства мини пород Медальоны ягненок',
  //   price: 180,
  // };

  return (
    <div className="col">
      <div className="card h-100" style={{ minWidth: '18rem' }}>
        <div className="product__card-picture pt-3">
          <img src={pictures} className="card-img-top product__card-picture" alt="..." />
        </div>
        <div className="card-body text-start">
          <p className="card-text">{name}</p>
        </div>
        <footer className="px-3 pb-3">
          <div>
            <span>Наличие: </span>
            <span>{availableQuantity()}</span>
          </div>
          <div className="d-flex product__card">
            <div className="d-flex w-100 me-auto p-1 ps-0">
              <div
                className="d-flex bg-secondary bg-opacity-10
                border border-tertiary rounded w-100"
              >
                <p className="m-auto ms-2 fw-semibold product__card-price">
                  {discount ? (
                    <span className="me-2">
                      {`${
                        price - price / discount
                      } \u{20BD}`}
                    </span>
                  ) : (
                    ''
                  )}
                  <span
                    className={clsx(
                      { 'text-decoration-line-through': discount },
                      { 'fw-normal': discount },
                      { 'text-muted': discount },
                    )}
                  >
                    {price}
                    {' '}
                    &#8381;
                  </span>
                </p>
              </div>
            </div>
            <div className="p-1">
              <button type="button" className="btn btn-outline-danger card__btn">
                <i className="fa-regular fa-heart fa-lg" />
              </button>
            </div>
            <div className="p-1 pe-0">
              <button type="button" className="btn btn-secondary">
                <i className="fa-solid fa-shopping-cart fa-lg" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
