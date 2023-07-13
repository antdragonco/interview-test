import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Explore = () => {
  type dataType = {id: string; url: string; description: string};

  const Item = ({id, url, description}: dataType) => {
    if (
      searchQuery == '' ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return (
        <View key={id} style={styles.flatListContainer}>
          <Image source={{uri: url}} style={styles.image} />
          <Text style={styles.text}>{description}</Text>
        </View>
      );
  };

  const [data, setData] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, onChangeSearchQuery] = useState('');

  const url = 'http://localhost:3000/images';
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
        <TextInput
          placeholder="Search"
          clearButtonMode="always"
          style={styles.searchBox}
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={onChangeSearchQuery}
        />
        <FlatList
          data={data}
          renderItem={({item}) => (
            // filterData
            <Item id={item.id} url={item.url} description={item.description} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    height: '100%',
    backgroundColor: 'white',
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 24,
    paddingTop: 20,
    textAlign: 'center',
  },
  flatListContainer: {
    backgroundColor: 'orange',
    marginVertical: 10,
    marginHorizontal: 16,
    paddingBottom: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    height: 200,
    width: '100%',
  },
});
