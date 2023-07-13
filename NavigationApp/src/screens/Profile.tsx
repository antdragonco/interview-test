import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const Profile = () => {
  type dataType = {id: string; name: string; email: string; avatar: string};

  const [data, setData] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);

  const url = 'http://localhost:3000/profile';
  const brl = data.avatar;

  const getProfile = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleVisibleModal = () => {};

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.container}>
            <Image source={{uri: brl}} style={styles.image} />
            <View>
              <Text style={styles.textName}>{data.name}</Text>
              <Text style={styles.textEmail}> {data.email}</Text>
            </View>
            <View style={styles.header_container}>
              <TouchableOpacity
                onPress={handleVisibleModal}
                style={styles.btnNewContainer}>
                <Text style={styles.textButton}>Edit Profile</Text>
              </TouchableOpacity>
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
});
