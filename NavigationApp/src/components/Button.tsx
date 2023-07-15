import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';

export interface Props {
  name: string;
  handleOnPress(): void;
  isRed: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<Props> = props => {
  return (
    <View
      style={[
        styles.btnModalContainer,
        {backgroundColor: 'green'},
        props.isRed && {backgroundColor: 'red'},
      ]}>
      <TouchableOpacity onPress={props.handleOnPress}>
        <Text style={styles.textButton}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnModalContainer: {
    padding: 10,
    width: '30%',
    borderRadius: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
  },
  textButtonRed: {
    textAlign: 'center',
    color: 'black',
  },
});
