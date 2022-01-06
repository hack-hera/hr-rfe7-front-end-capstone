import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

const ImageGallery = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [galleryLength, setGalleryLength] = useState(props.currentStyle.photos.length);

  useEffect(() => {
    setGalleryLength(props.currentStyle.photos.length);
  }, [props.currentStyle.photos]);

  const next = () => {
    if (currentImage < (galleryLength - 1)) {
      setCurrentImage(prevState => prevState + 1);
    }
  };

  const previous = () => {
    if (currentImage > 0) {
      setCurrentImage(prevState => prevState - 1);
    }
  };

  return (
    <Carousel_Container>
      <Carousel_Wrapper>
        {currentImage > 0 &&
        <UpArrow>
          <FontAwesomeIcon icon = {faArrowCircleUp} onClick = {previous}/>
        </UpArrow>
        }
        <Carousel_content_wrapper>
          <Carousel_content style={{ transform: `translateY(-${currentImage * (41)}px)` }}>
            {props.currentStyle.photos.map((photo, key) => (
              <Thumbnail_Container>
                <Thumbnail
                  key={key}
                  src={photo.thumbnail_url}
                  onClick={() => {
                    props.changePhoto(photo);
                    setCurrentImage(key);
                  }}
                />
              </Thumbnail_Container>
            ))}
          </Carousel_content>
        </Carousel_content_wrapper>
        {currentImage < (galleryLength - 1) &&
        <DownArrow>
          <FontAwesomeIcon icon = {faArrowCircleDown} onClick = {next}/>
        </DownArrow>
        }
      </Carousel_Wrapper>
    </Carousel_Container>
  );
};

export default ImageGallery;

const UpArrow = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;

  width: 30px;
  height: 30px;
`;

const DownArrow = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  transform: translateY(60px);
  width: 30px;
  height: 30px;
`;

const Carousel_Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Carousel_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  justify-content: center;
`;

const Carousel_content_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Carousel_content = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Thumbnail_Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  margin: 3px;
  border: 6px;

  border-color: blue;

  max-height: 55px;
  width: 35px;
  background-color: red;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;