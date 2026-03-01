import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [added, setAdded] = React.useState(false);
    const [reviews, setReviews] = React.useState([]);
    const [avgRating, setAvgRating] = React.useState(0);
    const [newReview, setNewReview] = React.useState({ rating: 5, comment: '' });

    React.useEffect(() => {
        if (!product) return;
        const fetchReviews = async () => {
            try {
                const res = await fetch(`http://localhost:4100/product/${product._id || product.id}/reviews`);
                const data = await res.json();
                if (data.success) {
                    setReviews(data.reviews);
                    setAvgRating(data.averageRating);
                }
            } catch (e) {
                console.error("Failed to load reviews");
            }
        };
        fetchReviews();
    }, [product]);

    const handleAddReview = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('auth-token');
        if (!token) return alert("Please login to leave a review");
        try {
            const res = await fetch(`http://localhost:4100/product/${product._id || product.id}/review`, {
                method: 'POST',
                headers: { 'auth-token': token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newReview, productNumId: product.id })
            });
            const data = await res.json();
            if (data.success) {
                setReviews([...reviews, data.review]);
                setNewReview({ rating: 5, comment: '' });
            } else {
                alert(data.error || "Failed to add review");
            }
        } catch (e) { }
    };

    const handleAddToCart = () => {
        addToCart(product.id);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    }

    return (
        <>
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
                        <img src={avgRating >= 1 ? star_icon : star_dull_icon} alt="star" />
                        <img src={avgRating >= 2 ? star_icon : star_dull_icon} alt="star" />
                        <img src={avgRating >= 3 ? star_icon : star_dull_icon} alt="star" />
                        <img src={avgRating >= 4 ? star_icon : star_dull_icon} alt="star" />
                        <img src={avgRating >= 4.5 ? star_icon : star_dull_icon} alt="star" />
                        <p>({reviews.length} reviews)</p>
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

                    <p className='productdisplay-right-category'><span>Category: </span>{product.category || 'Women'}</p>
                    <p className='productdisplay-right-category'><span>Tags: </span>{product.tags?.join(', ') || 'Modern, Latest'}</p>
                </div>
            </div>
            <div className="product-reviews-section">
                <div className="luxury-divider"><span>◈</span></div>
                <h2 className="reviews-title">Customer Reviews</h2>
                <div className="reviews-grid">
                    <div className="reviews-list">
                        {reviews.length === 0 ? <p className="no-reviews">Be the first to review this product!</p> :
                            reviews.map((rev, idx) => (
                                <div key={idx} className="review-card">
                                    <div className="review-header">
                                        <span className="reviewer-name">{rev.user?.name || 'Customer'}</span>
                                        <span className="review-rating">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                                    </div>
                                    <p className="review-comment">{rev.comment}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="review-form-container">
                        <h3>Leave a Review</h3>
                        <form onSubmit={handleAddReview} className="review-form">
                            <select value={newReview.rating} onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                            <textarea placeholder="Write your experience..." value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} required></textarea>
                            <button type="submit" className="btn-premium">Submit Review</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
