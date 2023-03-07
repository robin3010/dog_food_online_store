export function WishlistButtonTooltip({ isWishlisted }) {
  return (
    <span className="btn-tooltip__text">
      {isWishlisted ? 'Убрать из избранного' : 'Добавить в избранное'}
    </span>
  );
}

export function AddToCartButtonTooltip({ isAddedtoCart }) {
  if (!isAddedtoCart) return null;
  return (
    <span className="btn-tooltip__text">
      Перейти в корзину
    </span>
  );
}

export function ItemCountLimitTooltip({ stock, count }) {
  if (count === stock) {
    return (
      <span className="btn-tooltip__text">
        {`Данный товар доступен только в количестве ${stock} шт.`}
      </span>
    );
  }
}

export function NavLinkTooltip({ text }) {
  // if (!isAddedtoCart) return null;
  return (
    <span className="btn-tooltip__text fs-6 bg-opacity-100">
      {text}
    </span>
  );
}
