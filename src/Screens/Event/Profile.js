import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import {colors} from '../../assets/res/style/colors';
import Header from '../../Components/NavigationHeader/index';
import RNRestart from 'react-native-restart';

const Profile = () => {
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      const data = await AsyncStorage.getItem('LOGIN_DATA');
      setuserData(data);
    };
    getdata();
  }, []);

  const onLogout2 = async () => {
    await AsyncStorage.clear();
    RNRestart.restart();
  };

  //This Funcation onLogout
  const onLogout = () => {
    Alert.alert(
      'Log out',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Confirm',
          onPress: () => {
            onLogout2();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <>
      <Header Title={'Profile'} subtitle={''} />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onLogout()} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, justifyContent: 'flex-end'},
  pic: {
    width: 80,
    height: 80,
  },
  logoutBtn: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  logoutText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
});

export default Profile;
