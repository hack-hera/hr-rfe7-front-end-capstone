import React from 'react';
import StarButton from './StarButton.jsx';
import XButton from './XButton.jsx';

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInYourOutfit: false
    };

  }
  render() {
    const isInYourOutfit = this.state.isInYourOutfit;
    let button;

    if (!isInYourOutfit) {
      button = <StarButton onClick={this.handleStarClick} />;
    } else {
      button = <XButton onClick={this.handleXClick} />;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
}