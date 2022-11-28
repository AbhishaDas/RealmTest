
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList, SafeAreaView, TextInput } from 'react-native';

import realm, { getAllBooks, addBooks, deleteAllBooks, deleteBooks  } from './realm';

function App() {
  const [books, setBooks] = useState(getAllBooks);
  const [data, setData] = useState({ bookName: '', autherName: '', details: '' });
  const [counter, setCounter] = useState(books.length + 1);
  const renderItem = ({ item }) => (
    <View style={styles.itemViewStyle}>
      <Text>{item.recordID}</Text>
      <Text>{item.bookName}</Text>
      <Text>{item.autherName}</Text>
      <Text>{item.details}</Text>
      <Button 
        title="Delete"
        onPress={() => {
          deleteBooks(item.recordID);
          setBooks(getAllBooks);
          setCounter(books.length + 1);
        }}
        />
    </View>
  );
  return (
    <SafeAreaView style={{ padding: 3 }}>

      <TextInput
        style={styles.input}
        onChangeText={(e) => setData({ ...data, bookName: e })}
        value={data.name} 
      ><Text>BookName</Text></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={(e) => setData({ ...data, autherName: e })}
        value={data.phoneNumber}
      ><Text>AutherName</Text></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={(e) => setData({ ...data, details: e })}
        value={data.phoneNumber}
      ><Text>Details</Text></TextInput>
      <View style={styles.button}>
        <Button
          title="Add"
          onPress={(() => {
            addBooks(counter,data.bookName, data.autherName, data.details);
            setData({ bookName: '', autherName: '', details: '' })
            setBooks(getAllBooks);
            setCounter(counter + 1);
          })}
        />
      </View>
      <View style={styles.button}>
        <Button 
        title="Delete"
        onPress={() => {
          deleteAllBooks();
          setBooks(getAllBooks);
          setCounter(1);
        }}
        />
      </View>
      <View>
        <Text style={styles.textHeader}>Books</Text>
        <FlatList
          data={books}
          keyExtractor={item => item.recordID}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 3,
    width: 250
  },
  textHeader: {
    marginTop: 3,
    fontSize: 25,
    fontWeight: 'bold',
alignSelf: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  itemViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  }
});

export default App;