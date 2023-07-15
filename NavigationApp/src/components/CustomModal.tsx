import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';

export type Props = {
  handelUpdateTask1(input: string, input2: string, input3: string): void;
  handleOnPressClose(): void;
  visible: boolean;
  input1: string;
  input2: string;
  input3: string;
};
import Button from './Button';

const CustomModal: React.FC<Props> = props => {
  const [input1, onChangeInput1] = useState(props.input1);
  const [input2, onChangeInput2] = useState(props.input2);
  const [input3, onChangeInput3] = useState(props.input3);

  const handelUpdateValues = (
    input1: string,
    input2: string,
    input3: string,
  ) => {
    props.handelUpdateTask1(input1, input2, input3);
  };

  const handleOnClick = () => {
    handelUpdateValues(input1, input2, input3);
  };

  return (
    <View>
      <Modal animationType="slide" visible={props.visible}>
        <SafeAreaView>
          <View style={styles.form}>
            <TouchableOpacity onPress={props.handleOnPressClose}>
              <Text style={styles.txtClose}>Close</Text>
            </TouchableOpacity>
            <TextInput
              value={input1}
              style={styles.text_input}
              placeholder="Name"
              onChangeText={onChangeInput1}
            />
            <TextInput
              value={input2}
              style={styles.text_input}
              placeholder="Email Address"
              onChangeText={onChangeInput2}
            />

            <TextInput
              value={input3}
              style={styles.text_input}
              placeholder="Image Url"
              onChangeText={onChangeInput3}
            />
            <View style={styles.btn_container}>
              <Button
                isRed={false}
                name="Update"
                handleOnPress={handleOnClick}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  form: {
    padding: 20,
    // backgroundColor : "#e3e3e3",
    marginTop: 10,
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
  },
  txtClose: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 10,
    textAlign: 'right',
  },
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 15,
  },
});
