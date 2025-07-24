function StockCard({ symbol, price, change }) {
    const changeClass = change > 0 ? 'change-positive' : 'change-negative';
    return (
      <div className="stock-card">
        <h3>{symbol}</h3>
        <div className="price">${price ? price.toFixed(2) : 'N/A'}</div>
        <div className={changeClass}>{change ? change.toFixed(2) : '0.00'}%</div>
      </div>
    );
  }


export default StockCard