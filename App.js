import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {configureStore} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/Navigator/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChekLoggedInUser} from './src/helper/event_helper';
import {colors} from './src/assets/res/style/colors';

function App() {
  const [IsLogedin, setIsLogedin] = useState(false);
  const [checkedSignIn, setcheckedSignIn] = useState(false);

  //Login check Funcation
  useEffect(() => {
    setTimeout(() => {
      const chekisSignedIn = async () => {
        try {
          let USER_DATA = await AsyncStorage.getItem('LOGIN_DATA');
          USER_DATA = JSON.parse(USER_DATA);
          if (USER_DATA) {
            setIsLogedin(true);
          }
          setcheckedSignIn(true);
        } catch (error) {
          setIsLogedin(false);
          setcheckedSignIn(true);
        }
      };
      chekisSignedIn();
    }, 1200);
  }, []);

  ChekLoggedInUser();

  return (
    <Provider store={configureStore}>
      <NavigationContainer>
        {checkedSignIn == true ? (
          <StackNavigator isLogedin={IsLogedin} />
        ) : (
          <View style={styles.Container}>
            <Text style={styles.logo}>Pliē</Text>
          </View>
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.statusbarcolor,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 50,
  },
});
