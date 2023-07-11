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
  Switch,
} from 'react-native';

const Home = () => {
  type dataType = {id: string; title: string; description: string};

  const Item = ({id, title, description}: dataType) => (
    <View key={id} style={styles.item}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}>
          <TouchableOpacity onPress={() => handelDelete(id)}>
            <Text style={styles.txt_del}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleVisibleUpdate(id, title, description)}>
            <Text style={styles.txt_edit}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.desc}>{description}</Text>
    </View>
  );

  const [data, setData] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setViisble] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [title, onChangeTitle] = useState('');
  const [desc, onChangeDesc] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const toggleSwitch = () => setIsCompleted(previousState => !previousState);

  const handleVisibleModal = () => {
    setViisble(!visible);
    setIsUpdate(false);
    onChangeTitle('');
    onChangeDesc('');
    setIsCompleted(false);
    setTaskId('');
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
        id: '',
        title: title,
        description: desc,
        completed: isCompleted,
      }),
    });
  };

  const updateTask = (id: string) => {
    fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: taskId,
        title: title,
        description: desc,
        completed: isCompleted,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(JSON.stringify(responseData));
      });
  };

  const handleAddTask = () => {
    setViisble(!visible);
    setIsUpdate(false);
    if (title) {
      addTask();
      getTask();
      onChangeTitle('');
      onChangeDesc('');
    } else {
      console.log('Empty Submission');
    }
  };

  const handelDelete = (id: string) => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setData(values => {
          return values.filter(item => item.id !== id);
        });
      });
  };

  const handleVisibleUpdate = (id: string, title: string, desc: string) => {
    setTaskId(id);
    onChangeTitle(title);
    onChangeDesc(desc);
    setViisble(!visible);
    setIsUpdate(true);
  };

  const handelUpdateTask = () => {
    if (title) {
      updateTask(taskId);
      getTask();
      setViisble(!visible);
    } else {
      console.log('Empty Submission');
    }
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
              <Text>
                {' '}
                {title} {desc} {taskId} {isCompleted}
              </Text>

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
              <Text style={{fontSize: 20, padding: 5}}>Status:</Text>
              <Switch
                trackColor={{false: '#767577', true: 'green'}}
                thumbColor={isCompleted ? 'white' : 'white'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isCompleted}
                style={{padding: 10}}
              />

              {isUpdate ? (
                <TouchableOpacity
                  onPress={handelUpdateTask}
                  style={styles.btnModalContainer}>
                  <Text style={styles.textButton}>{'Update'}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleAddTask}
                  style={styles.btnModalContainer}>
                  <Text style={styles.textButton}>{'Submit'}</Text>
                </TouchableOpacity>
              )}
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
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
  },
  txt_del: {
    fontSize: 14,
    marginEnd: 10,
    color: 'red',
    fontWeight: 'bold',
  },
  txt_edit: {
    fontSize: 14,
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
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
