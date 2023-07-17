import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';

type Props = {};

const LoadingIndicator: React.FC<Props> = props => {
  return (
    <View style={styles.indicator_container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  indicator_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
