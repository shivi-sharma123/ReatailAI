import React, { useState } from 'react';
import './ProductReviews.css';

const ProductReviews = ({ 
  product, 
  reviews = [], 
  onClose, 
  onAddToCart, 
  onAddToWishlist, 
  onShowAR, 
  onProductClick,
  ProductRecommendationsComponent 
}) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState(0);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    wouldRecommend: true
  });

  // Sort and filter reviews
  const filteredReviews = reviews
    .filter(review => filterRating === 0 || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
          onClick={() => interactive && onStarClick && onStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log('Submitting review:', newReview);
    alert('Review submitted successfully!');
    setShowWriteReview(false);
    setNewReview({
      rating: 5,
      title: '',
      comment: '',
      wouldRecommend: true
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ratingDistribution = getRatingDistribution();
  const averageRating = getAverageRating();

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <h3>Customer Reviews</h3>
        <button 
          className="write-review-btn"
          onClick={() => setShowWriteReview(true)}
        >
          Write a Review
        </button>
      </div>

      {/* Review Summary */}
      <div className="review-summary">
        <div className="overall-rating">
          <div className="rating-number">{averageRating}</div>
          <div className="rating-stars">
            {renderStars(Math.round(parseFloat(averageRating)))}
          </div>
          <div className="rating-count">
            Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="rating-breakdown">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="rating-bar">
              <span className="rating-label">{rating} ★</span>
              <div className="bar-container">
                <div 
                  className="bar-fill" 
                  style={{ 
                    width: reviews.length > 0 
                      ? `${(ratingDistribution[rating] / reviews.length) * 100}%` 
                      : '0%' 
                  }}
                ></div>
              </div>
              <span className="rating-count">{ratingDistribution[rating]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Controls */}
      {reviews.length > 0 && (
        <div className="review-controls">
          <div className="filter-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>

            <select 
              value={filterRating} 
              onChange={(e) => setFilterRating(parseInt(e.target.value))}
              className="filter-select"
            >
              <option value={0}>All Ratings</option>
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>
          </div>
          
          <div className="results-count">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="reviews-list">
        {filteredReviews.length === 0 ? (
          <div className="no-reviews">
            <div className="no-reviews-icon">📝</div>
            <h4>No reviews yet</h4>
            <p>Be the first to review this product!</p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">{review.userName}</div>
                    {review.verified && (
                      <div className="verified-purchase">✅ Verified Purchase</div>
                    )}
                  </div>
                </div>
                <div className="review-meta">
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <div className="review-date">{formatDate(review.date)}</div>
                </div>
              </div>

              <div className="review-content">
                <h4 className="review-title">{review.title}</h4>
                <p className="review-comment">{review.comment}</p>
              </div>

              <div className="review-footer">
                <button className="helpful-btn">
                  👍 Helpful ({review.helpful})
                </button>
                <button className="report-btn">
                  Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="review-modal-overlay">
          <div className="review-modal">
            <div className="modal-header">
              <h3>Write a Review</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setShowWriteReview(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-group">
                <label>Rating *</label>
                <div className="rating-input">
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview({...newReview, rating})
                  )}
                  <span className="rating-text">({newReview.rating} out of 5 stars)</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="review-title">Review Title *</label>
                <input
                  id="review-title"
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                  placeholder="Summarize your review"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="review-comment">Review *</label>
                <textarea
                  id="review-comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Tell others about your experience with this product"
                  rows={5}
                  required
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newReview.wouldRecommend}
                    onChange={(e) => setNewReview({...newReview, wouldRecommend: e.target.checked})}
                  />
                  I would recommend this product to others
                </label>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowWriteReview(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Recommendations */}
      {ProductRecommendationsComponent && <ProductRecommendationsComponent />}
    </div>
  );
};

export default ProductReviews;
