import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, Image, Keyboard, TouchableOpacity } from 'react-native';

export default function App() {

  const[content, setContent]=useState('')
  const[keyword, setKeyword]=useState('');
  const[results, setResults]=useState([]);

  const searchMeal = () =>{
    Keyboard.dismiss()
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+keyword)
    .then(response=> response.json())
    .then (data => setResults(data.meals))
    .catch(error =>{
      Alert.alert('Error occurred', error);
    });
  }

  const searchRecipe = () =>{
    console.log('btnPressed')
  }

  return (
  <View style={styles.container}>

  <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:30}}>
      <Text>Search a meal by ingredient!</Text>
      <TextInput style={styles.input} onChangeText={keyword =>setKeyword(keyword)} value={keyword}/>
      <Button onPress={searchMeal} title='SEARCH'/>
  </View>

  <View style={{flex:3, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
  <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
        <View>
          <Text
            style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}
          </Text>
          <TouchableOpacity onPress={searchRecipe} activeOpacity={0.8}>
            <Image source={{uri: item.strMealThumb}}
            style={{width: 200, height: 200}} />
          </TouchableOpacity>
          
        </View>}
        data={results} />
  </View>

    

    <StatusBar style="auto" />
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width:200,
    marginBottom:20,
    borderColor:'gray',
    borderWidth:1
  },
});
