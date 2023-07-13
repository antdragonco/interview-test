import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';

const Notification = () => {
  type dataType = {id: string; message: string; read: boolean};

  const Item = ({id, message, read}: dataType) => (
    <View key={id} style={styles.item}>
      {read ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{message}</Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title_unread}>{message}</Text>
          <Text>New</Text>
          <Icon name="circle-thin" size={24} color="#900" />
          <AntdesignIcon name="codesquare" size={30} color="red" />
        </View>
      )}
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
          renderItem={({item}) => (
            <Item id={item.id} message={item.message} read={item.read} />
          )}
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
  title_unread: {
    fontSize: 20,
    color: '#218aff',
  },
  separator: {
    height: 2,
    backgroundColor: '#f1f2f6',
  },
});
