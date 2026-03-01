import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import { Item } from '../Components/Item/Item'

export const ShopCategory = (props) => {
  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4100/products/search?category=${props.category}&page=${page}&limit=12&sort=${sort}`);
        const data = await res.json();
        if (data.success) {
          if (page === 1) {
            setProducts(data.products);
          } else {
            setProducts(prev => [...prev, ...data.products]);
          }
          setTotal(data.total);
        }
      } catch (e) {
        console.error("Fetch products error", e);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [props.category, page, sort]);

  // Reset page when category changes
  React.useEffect(() => {
    setPage(1);
  }, [props.category]);

  const getCategoryDetails = () => {
    switch (props.category) {
      case 'women':
        return {
          title: "The Women's Collection",
          subtitle: "Timeless silhouettes meets contemporary flair.",
          theme: "women-theme"
        };
      case 'men':
        return {
          title: "The Men's Edit",
          subtitle: "Understated luxury for the modern gentleman.",
          theme: "men-theme"
        };
      case 'kid':
        return {
          title: "The Kids' Gallery",
          subtitle: "Playful premium fashion for little visionaries.",
          theme: "kids-theme"
        };
      default:
        return { title: "Collection", subtitle: "Explore our latest pieces", theme: "" };
    }
  }

  const { title, subtitle, theme } = getCategoryDetails();

  return (
    <div className={`shop-category ${theme}`}>
      <div className="category-hero">
        <div className="category-hero-content">
          <p className="category-tag animate-fade-up">Curated Collection</p>
          <h1 className="animate-fade-up">{title}</h1>
          <p className="category-subtitle animate-fade-up">{subtitle}</p>
        </div>
        <div className="category-hero-bg">
          <div className="cat-shape-1"></div>
          <div className="cat-shape-2"></div>
        </div>
      </div>

      <div className="shopcategory-filter-bar reveal active">
        <div className="shopcategory-filter-left">
          <p>Showing <span>{products.length}</span> of <span>{total}</span> Products</p>
        </div>
        <div className="shopcategory-sort">
          <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'Poppins', color: 'var(--brown)', cursor: 'pointer', fontSize: '14px', marginRight: '5px' }}>
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
          <img src={dropdown_icon} alt="sort" style={{ pointerEvents: 'none' }} />
        </div>
      </div>

      <div className="shopcategory-products reveal active">
        {products.map((item, i) => (
          <Item key={item._id || i} id={item.id} name={item.name} image={item.image}
            new_price={item.new_price} old_price={item.old_price} />
        ))}
        {products.length === 0 && !loading && <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>No products found.</div>}
      </div>

      {products.length < total && (
        <div className="shopcategory-loadmore reveal active" onClick={() => setPage(prev => prev + 1)}>
          {loading ? 'Loading...' : 'Explore More'}
        </div>
      )}
    </div>
  )
}
