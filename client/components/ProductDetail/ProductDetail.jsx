import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../api';
import { Stars } from '../Shared/Stars';
import { totalRating } from '../../lib/ratingFunctions';
import ProductImage from './ProductImage.jsx';
import StyleSelector from './StyleSelector.jsx';
import ImageOptions from './ImageOptions.jsx';
import Selection from './Checkout.jsx';
import RenderPrice from './RenderPrice.jsx';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: null,
      productStyles: null,
      currentStyle: null,
      selectedPhoto: null,
      selectedSize: '',
      selectedQuantity: '',
      cart: []
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
      selectedPhoto: style.photos[0]
    });
  }

  changePhoto(photo) {
    this.setState({
      selectedPhoto: photo
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.product;
    if (id && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      api.getProductStyles({ product_id: id }).then((res) => {
        this.setState({ productStyles: res, currentProduct: this.props.product, currentStyle: res.results[0], selectedPhoto: res.results[0].photos[0]
        });
      });
    }
  }

  render() {
    const { currentProduct, productStyles, currentStyle, selectedPhoto, selectedSize, selectedQuantity } = this.state;
    return (
      <Container>
        <h3>Product Details</h3>
        {currentProduct && (
          <ProductContainer>
            <DisplayContainer>
              <ImageOptionsContainer>
                <ImageOptions
                  productStyles={currentStyle}
                  changePhoto={this.changePhoto}/>
              </ImageOptionsContainer>
              <ImageContainer>
                <ProductImage selectedPhoto = {selectedPhoto}/>
              </ImageContainer>
            </DisplayContainer>
            <ProductInfo>
              <div>//***** Read all reviews//</div>
              <div>category: {currentProduct.category}</div>
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
              <Checkout>
                <Selection
                  currentStyle = {currentStyle}
                  changeSize = {this.changeSize}
                  selectedSize = {selectedSize}
                  changeQuantity = {this.changeQuantity}
                  addToCart = {this.addToCart}/>
              </Checkout>
              <button>*</button>
              <p>
                <b>Description: </b>
                {currentProduct.description}
              </p>
            </ProductInfo>
          </ProductContainer>
        )}
      </Container>
    );
  }
}

const Checkout = styled.div`
  display: flex;
  margin-bottom: 5px;
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

const ImageOptionsContainer = styled.div`
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

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%
`;

export default ProductDetail;

// let placeHolderURL = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-no-image-available-icon-flat-vector-illustration.jpg?ver=6';