import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../api';
import { Stars } from '../Shared/Stars';
import { totalRating } from '../../lib/ratingFunctions';
import ProductImage from './ProductImage.jsx';
import StyleSelector from './StyleSelector.jsx';
import ImageGallery from './ImageGallery.jsx';
import UpdateCart from './UpdateCart.jsx';
import RenderPrice from './RenderPrice.jsx';
import { Modal } from '../Shared/Modal';
import ShareButtons from './ShareButtons.jsx';
import ProductDescription from './ProductDescription.jsx';
import ScrollToReviews from './ScrollToReviews.jsx';

const ProductDetail = ({ product, productReviews, addToCart }) => {
  console.log('>>>>>', product);

  const [style, setStyle] = useState(product.styles.length > 0 ? product.styles[0] : null);
  const [photo, setPhoto] = useState(
    product.styles.length > 0 ? product.styles[0].photos[0] : null
  );

  let rating = totalRating(productReviews.ratings);
  let allRatings = productReviews.numReviews;

  useEffect(() => {
    if (product.styles.length > 0) {
      setStyle(product.styles.length > 0 ? product.styles[0] : null);
      setPhoto(product.styles.length > 0 ? product.styles[0].photos[0] : null);
    } else {
      setStyle(null);
      setPhoto(null);
    }
  }, [product.id]);

  return (
    <Container id='ProductDetail'>
      <h3>Product Details</h3>
      <ProductContainer>
        {style && (
          <DisplayContainer>
            <ImageGalleryContainer>
              <ImageGallery currentStyle={style} changePhoto={(photo) => setPhoto(photo)} />
            </ImageGalleryContainer>
            <ImageContainer>{photo && <ProductImage currentPhoto={photo} currentStyle={style} changePhoto={(photo) => setPhoto(photo)}/>}</ImageContainer>
          </DisplayContainer>
        )}
        <ProductInfoContainer>
          <ReviewsContainer>
            <Stars number={rating} />
            <ScrollToReviews allRatings={allRatings} />
          </ReviewsContainer>
          <br></br>
          <div>
            <b>Category:</b> {product.category}
          </div>
          <p>
            <b>Product Name: </b>
            {product.name}
          </p>
          {style && (
            <>
              <p>
                <b>Style: </b>
                {style.name}
              </p>

              {/* TODO - Refactor this to accept default price if there styles.length === 0 */}
              <RenderPrice currentStyle={style} />
              <StyleSelector
                productStyles={product.styles}
                changeStyle={(style) => {
                  setStyle(style);
                  setPhoto(style.photos[0]);
                }}
              />
            </>
          )}
          <Cart>
            <UpdateCart style={style} product={product} addToCart={addToCart} />
          </Cart>
          <ShareButtons />
        </ProductInfoContainer>
      </ProductContainer>
      <ProductDescription currentProduct={product} />
    </Container>
  );
};

const ReviewsContainer = styled.div`
  display: flex;
`;

const Cart = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const ProductDescriptionContainer = styled.div`
  display: block;
`;

const DisplayContainer = styled.div`
  display: flex;
  width: 60%;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.bg};
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.8em;
`;

const ImageGalleryContainer = styled.div`
  display: inline-block;
  width: 33px;
  height: 440px;
  margin-right: 30px;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 50%;
`;

const Thumbnail = styled.img`
  margin-top: 3px;
  margin-bottom: 3px;
  max-height: 55px;
  max-width: 33px;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
`;

export default ProductDetail;
