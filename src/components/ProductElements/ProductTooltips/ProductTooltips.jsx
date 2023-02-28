export function WishlistButtonTooltip({ isWishlisted }) {
  return (
    <span className="tooltip-up btn-tooltip__text">
      {isWishlisted ? 'Убрать из избранного' : 'Добавить в избранное'}
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
