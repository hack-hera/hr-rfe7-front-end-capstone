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
import ProductImage from './ProductImage.jsx';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: null,
      productStyles: null,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props.product;
    if (id && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      api.getProductStyles({ product_id: id }).then((res) => {
        this.setState({ productStyles: res, currentProduct: this.props.product }, () =>
          console.log(this.state)
        );
      });
    }
  }

  render() {
    const { currentProduct, productStyles } = this.state;
    return (
      <Container>
        <h3>Product Details</h3>
        <ProductImage/>
        {currentProduct && (
          <ProductContainer>
            <p>
              <b>Product Name: </b>
              {currentProduct.name}
            </p>
            <p>
              <b>Description: </b>
              {currentProduct.description}
            </p>
            <p>
              <b>Price: </b>
              {currentProduct.default_price}
            </p>
            <ImageContainer>
              {productStyles.results[0].photos.map((i, k) => (
                <Thumbnail
                  key={k}
                  src={i.thumbnail_url}
                  onClick={() => alert('show a modal!' + i.url)}
                />
              ))}
            </ImageContainer>
          </ProductContainer>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  background-color: ${(props) => props.theme.bg};
`;

const ProductContainer = styled.div`
  font-size: 0.8em;
`;

const ImageContainer = styled.div`
  display: flex;
`;

const Thumbnail = styled.img`
  margin-right: 10px;
  height: 150px;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default ProductDetail;

// let placeHolderURL = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-no-image-available-icon-flat-vector-illustration.jpg?ver=6';