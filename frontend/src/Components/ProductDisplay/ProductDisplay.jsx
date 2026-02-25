import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [added, setAdded] = React.useState(false);

    const handleAddToCart = () => {
        addToCart(product.id);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="view 1" />
                    <img src={product.image} alt="view 2" />
                    <img src={product.image} alt="view 3" />
                    <img src={product.image} alt="view 4" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>
            </div>

            <div className="productdisplay-right">
                <div className="productdisplay-right-category-badge">
                    <span>✦ Featured</span>
                </div>
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_dull_icon} alt="star" />
                    <p>(122 reviews)</p>
                    <div className="produvtdisplay-right-prices">
                        <span className="productdisplay-right-price-old">${product.old_price}</span>
                        <span className="productdisplay-right-price-new">${product.new_price}</span>
                    </div>
                </div>

                <p className="productdisplay-right-description">
                    A timeless piece crafted with premium quality fabric. Designed for the modern woman who values both elegance and comfort. Each detail is thoughtfully curated for a luxurious experience.
                </p>

                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>XS</div>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                    </div>
                </div>

                <button
                    className={added ? "added" : ""}
                    onClick={handleAddToCart}
                >
                    {added ? "✦ Added to Bag" : "Add to Bag"}
                </button>

                <p className='productdisplay-right-category'><span>Category: </span>Women, T-shirt, Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags: </span>Modern, Latest</p>
            </div>
        </div>
    )
}
