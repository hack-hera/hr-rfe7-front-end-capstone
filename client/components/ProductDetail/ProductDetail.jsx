// import React from 'react';
// import ReactDOM from 'react-dom';
// import { COLORS } from '../../settings/colors';
// import styled from 'styled-components';
// import ProductImage from './ProductImage.jsx';
// import ProductGallery from './ProductGallery.jsx';
// import api from '../../api';


// const ProductDetail = (props) => {

//   return (
//     <div>
//       <Header>Product Detail</Header>
//       <ProductGallery product={props.product}/>
//       <ProductImage/>
//     </div>
//   );
// };




// const Header = styled.h1`
//   color: ${COLORS.logo};
// `;

// export default ProductDetail;

// const ProductDetail = (props) => {

//   return (
//     <div>
//       <Header>Product Detail</Header>
//       <img src={props.selectedImg} alt={props.selectedStyle} width="300px" height="300px"></img>
//     </div>
//   );
// };



// let styleDetails;

// if (props.product) {
//   api.getProductStyles(props.product.id).then((res) => {
//     styleDetails = res;
//   })
//     .then(() => {
//       console.log(styleDetails);
//     });
// }


// class ProductDetail extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentProduct: props.product,
//       styles: {}
//     };
//   }

//   // componentDidUpdate() {
//   //   api.getProductStyles(props.product.id).then((res) => {
//   //     this.setState({
//   //       styles: res
//   //     });
//   //   });
//   // }


//   render() {
//     return (
//       <div>
//         <Header>Product Detail</Header>
//         <ProductGallery />
//         <ProductImage/>
//       </div>
//     );
//   }
// }

import React, { Component } from 'react';
import styled from 'styled-components';
import api from '../../api';
import { Stars } from '../Shared/Stars';
import { totalRating } from '../../lib/ratingFunctions';
import ProductImage from './ProductImage.jsx';
import StyleSelector from './StyleSelector.jsx';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: null,
      productStyles: null,
      currentStyle: null,
      selectedPhoto: null
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.product;
    if (id && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      api.getProductStyles({ product_id: id }).then((res) => {
        this.setState({ productStyles: res, currentProduct: this.props.product, currentStyle: res.results[0], selectedPhoto: res.results[0].photos[0]}, () =>
          console.log(this.state)
        );
      });
    }
  }

  render() {
    const { currentProduct, productStyles, currentStyle, selectedPhoto } = this.state;
    return (
      <Container>
        <h3>Product Details</h3>
        {currentProduct && (
          <ProductContainer>
            <DisplayContainer>
              <ImageOptionsContainer>
                {productStyles.results[0].photos.map((i, k) => (
                  <Thumbnail
                    key={k}
                    src={i.thumbnail_url}
                    onClick={() => alert('show a modal! ' + i.url)}
                  />
                ))}
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
                <b>Price: </b>
                {currentProduct.default_price}
              </p>
              <StyleSelector productStyles={productStyles}/>
              <div>Size</div>
              <div>Qunatity</div>
              <div>Add to Cart</div>
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