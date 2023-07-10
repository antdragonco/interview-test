import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Image, StyleSheet, Text} from 'react-native';

const Profile = () => {
  type dataType = {id: string; name: string; email: string; avatar: string};

  const [data, setData] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);

  const url = 'http://localhost:3000/profile';
  const brl = data.avatar;
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {loading ? (
          <Text>Loading....</Text>
        ) : (
          <View style={styles.container}>
            <Image source={{uri: brl}} style={styles.image} />
            <View>
              <Text style={styles.textName}>{data.name}</Text>
              <Text style={styles.textEmail}> {data.email}</Text>
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
});
