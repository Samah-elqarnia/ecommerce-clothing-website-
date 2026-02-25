import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4100/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }

  useEffect(() => { fetchInfo(); }, []);

  const remove_product = async (id) => {
    await fetch('http://localhost:4100/removeproduct', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    });
    await fetchInfo();
  }

  return (
    <div className="list-product">
      <div className="list-product-header">
        <h1>All Products</h1>
        <span className="list-product-count">{allproducts.length} items</span>
      </div>
      <p className="list-product-subtitle">Manage your product catalog</p>

      <div className="list-product-table">
        {/* Table header */}
        <div className="listproduct-format-main header">
          <p>Image</p>
          <p>Product Name</p>
          <p>Old Price</p>
          <p>Sale Price</p>
          <p>Category</p>
          <p>Action</p>
        </div>

        <div className="listproduct-allproducts">
          {allproducts.map((product, index) => (
            <React.Fragment key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img
                  src={product.image}
                  alt={product.name}
                  className="listproduct-product-icon"
                />
                <p title={product.name}>{product.name}</p>
                <p style={{ color: 'var(--text-light)', textDecoration: 'line-through' }}>
                  ${product.old_price}
                </p>
                <p style={{ color: 'var(--brown)', fontWeight: 600 }}>
                  ${product.new_price}
                </p>
                <span className="category-badge">{product.category}</span>
                <div className="listproduct-remove-btn" onClick={() => remove_product(product.id)}>
                  <img src={cross_icon} alt="Remove" className='listproduct-remove-icon' />
                </div>
              </div>
              <hr className="listproduct-row-divider" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListProduct