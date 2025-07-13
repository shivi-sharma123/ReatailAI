import React, { useState } from 'react';
import './ProductImageGallery.css';

const ProductImageGallery = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = product.images || [product.image_url];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="product-image-gallery-modal" onClick={onClose}>
      <div className="gallery-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <span className="close-icon">×</span>
        </button>

        <div className="main-image-container">
          <img
            src={images[currentImageIndex]}
            alt={`${product.name} - Image ${currentImageIndex + 1}`}
            className={`main-image ${isZoomed ? 'zoomed' : ''}`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
          
          {images.length > 1 && (
            <>
              <button className="nav-button prev" onClick={prevImage}>
                <span className="nav-icon">‹</span>
              </button>
              <button className="nav-button next" onClick={nextImage}>
                <span className="nav-icon">›</span>
              </button>
            </>
          )}

          <div className="image-counter">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        <div className="thumbnail-strip">
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => handleImageClick(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="product-info-overlay">
          <h3>{product.name}</h3>
          <p className="brand">{product.brand}</p>
          <div className="price-display">
            <span className="current-price">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>
          <div className="rating-display">
            <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
            <span className="rating-text">{product.rating} ({product.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
