import {View, StyleSheet, ActivityIndicator, TextInput} from 'react-native';
import React, {useState} from 'react';

export type Props = {
  onTextInputChange(value: string): void;
};

const CustomSearchBar: React.FC<Props> = props => {
  const handleTextInputChange = (value: string) => {
    props.onTextInputChange(value);
  };

  return (
    <View>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={handleTextInputChange}
      />
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 20,
  },
});
