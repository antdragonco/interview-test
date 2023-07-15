import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import Button from '../components/Button';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [id, onChangeId] = useState('');
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [image, onChangeImage] = useState('');
  const [visible, setViisble] = useState(false);

  const url = 'http://localhost:3000/profile';

  const getProfile = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      onChangeId(json.id);
      onChangeName(json.name);
      onChangeEmail(json.email);
      onChangeImage(json.avatar);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const updateTask = () => {
    fetch(`${url}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name: name,
        email: email,
        avatar: image,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(JSON.stringify(responseData));
      });
  };

  const handleVisibleModal = () => {
    setViisble(!visible);
  };
  const handelUpdateTask = () => {
    updateTask();
    setViisble(!visible);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.container}>
            <Modal animationType="slide" visible={visible}>
              <SafeAreaView>
                <View style={styles.form}>
                  <TouchableOpacity onPress={handleVisibleModal}>
                    <Text style={styles.txtClose}>Close</Text>
                  </TouchableOpacity>
                  <TextInput
                    value={name}
                    style={styles.text_input}
                    placeholder="Name"
                    onChangeText={onChangeName}
                  />
                  <TextInput
                    value={email}
                    style={styles.text_input}
                    placeholder="Email Address"
                    onChangeText={onChangeEmail}
                  />

                  <TextInput
                    value={image}
                    style={styles.text_input}
                    placeholder="Image Url"
                    onChangeText={onChangeImage}
                  />
                  <TouchableOpacity
                    onPress={handelUpdateTask}
                    style={styles.btnModalContainer}>
                    <Text style={styles.textButton}>{'Update'}</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </Modal>
            <Image source={{uri: image}} style={styles.image} />
            <View>
              <Text style={styles.textName}>{name}</Text>
              <Text style={styles.textEmail}> {email}</Text>
            </View>
            <View style={styles.header_container}>
              <Button
                isRed={false}
                name="Edit Profile"
                handleOnPress={handleVisibleModal}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textName: {
    paddingTop: 30,
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  textEmail: {
    paddingTop: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  header_container: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnNewContainer: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFF',
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
  form: {
    padding: 20,
    // backgroundColor : "#e3e3e3",
    marginTop: 10,
  },
  btnModalContainer: {
    marginTop: 20,
    padding: 10,
    width: '50%',
    backgroundColor: 'green',
    borderRadius: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
