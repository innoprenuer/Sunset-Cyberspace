import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import CharacterStory from './CharacterStory';

class CharacterScene extends React.Component {
  static propTypes = {
    onFinish: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
  };

  state = { index: 0 };

  render() {
    const { index } = this.state;
    const { data, onFinish } = this.props;
    const { image, story, transition } = data[index];

    return (
      <Animatable.View
        useNativeDriver
        onAnimationEnd={() => {
          if (this.state.finished) {
            onFinish();
          } else {
            this.setState({ startStory: true });
          }
        }}
        animation={this.state.finished ? 'fadeOut' : 'fadeIn'}
        duration={transition || 200}
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <Image
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
          source={image}
        />
        <CharacterStory
          key={index}
          onFinish={() => {
            if (index === data.length - 1) {
              onFinish();
              return;
            }
            this.setState({ index: index + 1 });
          }}
          data={story}
        />
      </Animatable.View>
    );
  }
}
export default CharacterScene;
