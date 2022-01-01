import React from 'react';
import styled from 'styled-components';

const ImageGallery = (props) => {
  return (
    <div>
      <Carousel_Container>
        <Carousel_Wrapper>
          <UpArrow>
            &lt;
          </UpArrow>
          <Carousel_content_wrapper>
            <Carousel_content>
              {props.currentStyle.photos.map((i, k) => (
                <Thumbnail
                  key={k}
                  src={i.thumbnail_url}
                  onClick={() => {
                    props.changePhoto(i);
                  }}
                />
              ))}
            </Carousel_content>
          </Carousel_content_wrapper>
          <DownArrow>
            &gt;
          </DownArrow>
        </Carousel_Wrapper>
      </Carousel_Container>
    </div>
  );
};

export default ImageGallery;

const UpArrow = styled.button`
  position: absolute;
  z-index: 1;
  top: -50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
  transform: rotate(90deg);
`;

const DownArrow = styled.button`
  position: absolute;
  z-index: 1;
  bottom: -50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
  transform: rotate(90deg);
`;

const Carousel_Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Carousel_Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const Carousel_content_wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Carousel_content = styled.div`
  display: flex;
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Thumbnail = styled.img`
  margin: 3px;
  border: 6px;

  border-color: blue;

  max-height: 55px;
  max-width: 33px;
  background-color: red;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;



// return (
//   props.productStyles.photos.map((i, k) => (
//     <Thumbnail
//       key={k}
//       src={i.thumbnail_url}
//       onClick={() => {
//         props.changePhoto(i);
//       }}
//     />
//   ))
// );


// return (
//   <div>
//     <Carousel_Container>
//       <Carousel_Wrapper>
//         <Carousel_content_wrapper>
//           <Carousel_content>
//             {props.productStyles.photos.map((i, k) => (
//               <Thumbnail
//                 key={k}
//                 src={i.thumbnail_url}
//                 onClick={() => {
//                   props.changePhoto(i);
//                 }}
//               />
//             ))}
//           </Carousel_content>
//         </Carousel_content_wrapper>
//       </Carousel_Wrapper>
//     </Carousel_Container>
//   </div>
// );