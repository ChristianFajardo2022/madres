import React, { useState, useEffect } from "react";
import { fetchStockData, restarStock } from "../helpers/stockFunctions";

const Stock = () => {
  const [stock, setStock] = useState(null);

  useEffect(() => {
    fetchStockData(setStock);
  }, []);

  return (
    <div className="text-white">
      <h2>Stock</h2>
      {stock && (
        <div>
          <p>Stock disponible: {stock.stock}</p>
          <button onClick={() => restarStock(stock)}>Restar 1 al Stock</button>
        </div>
      )}
    </div>
  );
};

export default Stock;
