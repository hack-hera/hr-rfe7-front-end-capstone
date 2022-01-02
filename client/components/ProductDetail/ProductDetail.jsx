import React, { Component } from 'react';
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

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: null,
      productStyles: null,
      currentStyle: null,
      currentPhoto: null,
      selectedSize: '',
      selectedQuantity: '',
      cart: [],
      rating: null,
      allRatings: null
    };

    this.changeStyle = this.changeStyle.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(id, size, quantity) {
    var newCart = this.state.cart.slice();
    var item = {
      item: this.state.currentProduct,
      style: this.state.currentStyle,
      size: this.state.selectedSize.size,
      quantity: this.state.selectedQuantity
    };
    newCart.push(item);
    this.setState({
      cart: newCart
    });
  }

  changeSize(size) {
    if (size === 'Select Size') {
      this.setState({
        selectedSize: ''
      });
    }
    for (var key in this.state.currentStyle.skus) {
      if (this.state.currentStyle.skus[key].size === size) {
        this.setState({
          selectedSize: this.state.currentStyle.skus[key]
        });
        break;
      }
    }
    console.log(this.state.selectedSize);
  }

  changeQuantity(quantity) {
    this.setState({
      selectedQuantity: quantity
    });
  }

  changeStyle(style) {
    this.setState({
      currentStyle: style,
      currentPhoto: style.photos[0]
    });
  }

  changePhoto(photo) {
    this.setState({
      currentPhoto: photo
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.product;
    if (id && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      api.getProductStyles({ product_id: id }).then((res) => {
        this.setState({ productStyles: res, currentProduct: this.props.product, currentStyle: res.results[0], currentPhoto: res.results[0].photos[0], rating: totalRating(this.props.productReviews.ratings), allRatings: this.props.productReviews.numReviews
        });
      });
    }
  }

  render() {
    const { currentProduct, productStyles, currentStyle, currentPhoto, selectedSize, selectedQuantity, rating, allRatings } = this.state;
    return (
      <Container id="ProductDetail">
        <h3>Product Details</h3>
        {currentProduct && (
          <ProductContainer>
            <DisplayContainer>
              <ImageGalleryContainer>
                <ImageGallery
                  currentStyle={currentStyle}
                  changePhoto={this.changePhoto}/>
              </ImageGalleryContainer>
              <ImageContainer>
                <ProductImage currentPhoto = {currentPhoto}/>
              </ImageContainer>
            </DisplayContainer>
            <ProductInfoContainer>
              <ReviewsContainer>
                <Stars number={rating}/>
                <ScrollToReviews allRatings={allRatings}/>
              </ReviewsContainer>
              <br></br>
              <div><b>Category:</b> {currentProduct.category}</div>
              <p>
                <b>Product Name: </b>
                {currentProduct.name}
              </p>
              <p>
                <b>Style: </b>
                {currentStyle.name}
              </p>
              <RenderPrice
                currentStyle={currentStyle}/>
              <StyleSelector
                productStyles={productStyles}
                changeStyle={this.changeStyle}/>
              <Cart>
                <UpdateCart
                  currentStyle = {currentStyle}
                  changeSize = {this.changeSize}
                  selectedSize = {selectedSize}
                  changeQuantity = {this.changeQuantity}
                  addToCart = {this.addToCart}/>
              </Cart>
              <ShareButtons/>
              {currentProduct && <ProductDescription
                currentProduct={currentProduct}/>}
            </ProductInfoContainer>
          </ProductContainer>
        )}
      </Container>
    );
  }
}

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
  width: 35%
`;

export default ProductDetail;