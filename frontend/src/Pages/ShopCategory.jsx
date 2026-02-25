import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import { Item } from '../Components/Item/Item'

export const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const filtered = all_product.filter(item => item.category === props.category);

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

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filtered]);

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

      <div className="shopcategory-filter-bar reveal">
        <div className="shopcategory-filter-left">
          <p>Showing <span>{filtered.length}</span> Products</p>
        </div>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="sort" />
        </div>
      </div>

      <div className="shopcategory-products reveal">
        {filtered.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image}
            new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>

      <div className="shopcategory-loadmore reveal">Explore More</div>
    </div>
  )
}
