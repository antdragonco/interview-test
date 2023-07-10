import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

const Home = () => {
  type dataType = {id: string; title: string; description: string};

  const Item = ({id, title, description}: dataType) => (
    <View key={id} style={styles.item}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 10,
        }}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => handelDelete(item.id)}>
          <Text style={styles.txt_del}>Delete</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.txt_edit}>Edit</Text>
        </TouchableOpacity> */}
      </View>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );

  const [data, setData] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setViisble] = useState(false);
  const [hideId, setHideId] = useState(null);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const handleVisibleModal = () => {
    setViisble(!visible);
    setHideId(null);
  };

  const onChangeTitle = value => {
    setTitle(value);
  };

  const onChangeDesc = value => {
    setDesc(value);
  };

  const url = 'http://localhost:3000/items';

  const getTask = async () => {
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
    getTask();
  }, []);

  const addTask = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: desc,
      }),
    });
  };

  const handleAddTask = () => {
    setViisble(!visible);
    addTask();
    getTask();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Text style={styles.txt_main}>List of Tasks</Text>
          <TouchableOpacity
            onPress={handleVisibleModal}
            style={styles.btnNewContainer}>
            <Text style={styles.textButton}>New Task</Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" visible={visible}>
          <SafeAreaView>
            <View style={styles.form}>
              <TouchableOpacity onPress={handleVisibleModal}>
                <Text style={styles.txtClose}>Close</Text>
              </TouchableOpacity>
              <TextInput
                value={title}
                style={styles.text_input}
                placeholder="Title"
                onChangeText={onChangeTitle}
              />
              <TextInput
                value={desc}
                style={styles.text_input}
                placeholder="Desc"
                onChangeText={onChangeDesc}
              />
              <TouchableOpacity
                onPress={handleAddTask}
                style={styles.btnNewContainer}>
                <Text style={styles.textButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View>
              <Item
                id={item.id}
                title={item.title}
                description={item.description}
              />
            </View>
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
  txt_del: {
    fontSize: 14,
    marginTop: 5,
    color: 'red',
    fontWeight: 'bold',
  },
  txt_edit: {
    fontSize: 14,
    marginTop: 5,
    color: 'blue',
    fontWeight: 'bold',
  },
  header_container: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt_main: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  btnNewContainer: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  textButton: {
    textAlign: 'center',
    color: '#FFF',
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
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
  },
});
