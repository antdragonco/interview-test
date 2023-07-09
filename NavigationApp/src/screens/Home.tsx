import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';

const Home = () => {
  type dataType = {id: string; title: string; description: string};

  const Item = ({id, title, description}: dataType) => (
    <View key={id} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );

  const [data, setData] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);

  const url = 'http://localhost:3000/items';
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
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Item
              id={item.id}
              title={item.title}
              description={item.description}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 30,
    height: '100%',
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'orange',
    padding: 30,
    width: '90%',
    marginVertical: 8,
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
  },
  desc: {
    fontSize: 14,
  },
});
