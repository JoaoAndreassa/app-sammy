import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import PhotoGallery from '../src/components/PhotoGallery';

export default function GalleryScreen() {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')} // sua imagem de fundo
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <PhotoGallery />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    paddingTop: 40,
  },
});
