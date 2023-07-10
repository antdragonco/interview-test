import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';

const Notification = () => {
  type dataType = {id: string; message: string};

  const Item = ({id, message}: dataType) => (
    <View key={id} style={styles.item}>
      <Text style={styles.title}>{message}</Text>
    </View>
  );

  const [data, setData] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);

  const url = 'http://localhost:3000/notifications';
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
          renderItem={({item}) => <Item id={item.id} message={item.message} />}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    padding: 5,

    height: '100%',
    backgroundColor: 'white',
  },
  item: {
    padding: 15,
    width: '90%',
    marginVertical: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#f1f2f6',
  },
});
