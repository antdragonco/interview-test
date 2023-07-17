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
import Button from '../components/Button';
import LoadingIndicator from '../components/LoadingIndicator';

const Home = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setViisble] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [title, onChangeTitle] = useState('');
  const [desc, onChangeDesc] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const toggleSwitch = () => setIsCompleted(previousState => !previousState);
  const url = 'http://localhost:3000/items';

  type dataType = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  };

  const Item = ({id, title, description, completed}: dataType) => (
    <View key={id} style={styles.item}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => handelDelete(id)}>
            <Text style={styles.txt_del}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleVisibleUpdateModal(id, title, description, completed)
            }>
            <Text style={styles.txt_edit}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.desc}>{description}</Text>
    </View>
  );

  //get all task items
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

  //post task
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

  //put task
  const updateTask = (
    id: string,
    title: string,
    desc: string,
    isCompleted: boolean,
  ) => {
    fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
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

  //delete tasks
  const handelDelete = (id: string) => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setData(values => {
          return values.filter(item => item.id !== id);
        });
        console.log('Successfully deleted!');
      });

    getTask();
  };

  const resetItems = () => {
    setTaskId('');
    onChangeTitle('');
    onChangeDesc('');
    setIsCompleted(false);
  };

  //update tasks
  const handelUpdateTask = () => {
    if (title) {
      updateTask(taskId, title, desc, isCompleted);
      getTask();
      handleVisibleModal();
    } else {
      console.log('Empty Submission');
    }
  };

  //add new task
  const handleAddTask = () => {
    handleVisibleModal();
    setIsUpdate(false);
    if (title && desc) {
      addTask();
      getTask();
      resetItems();
    } else {
      console.log('Empty Submission');
    }
  };

  //toggles modal visibility by resetting values
  const handleVisibleModal = () => {
    setViisble(!visible);
    setIsUpdate(false);
    if (title || desc) {
      resetItems();
    }
  };

  //update/edit task
  const handleVisibleUpdateModal = (
    id: string,
    title: string,
    desc: string,
    completed: boolean,
  ) => {
    setTaskId(id);
    onChangeTitle(title);
    onChangeDesc(desc);
    setIsCompleted(completed);
    handleVisibleModal();
    setIsUpdate(true);
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.header_container}>
              <Text style={styles.txt_main}>List of Tasks</Text>
              <Button
                isRed={false}
                name="New Task"
                handleOnPress={handleVisibleModal}
              />
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
                  <View
                    style={{
                      paddingVertical: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 20}}>Status:</Text>
                    <Switch
                      trackColor={{false: '#767577', true: 'green'}}
                      thumbColor={'white'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isCompleted}
                    />
                  </View>

                  {isUpdate ? (
                    <Button
                      isRed={false}
                      name="Update"
                      handleOnPress={handelUpdateTask}
                    />
                  ) : (
                    <Button
                      isRed={false}
                      name="Submit"
                      handleOnPress={handleAddTask}
                    />
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
                    completed={item.completed}
                  />
                </View>
              )}
            />
          </View>
        </SafeAreaView>
      )}
    </>
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
  titleContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
  },
  header_container: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
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
  txtClose: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 10,
    textAlign: 'right',
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginTop: 10,
  },
  txt_main: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
    marginTop: 10,
  },
});
