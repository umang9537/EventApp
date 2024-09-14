import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Divider, TextInput} from 'react-native-paper';
import {colors} from '../../assets/res/style/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {login, resetLoginCode} from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {TostMessage} from '../../Components/TostMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const Login = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const {loginData, loginMsg, loginCode} = useSelector(state => ({
    loginData: state.loginreducer.loginData,
    loginMsg: state.loginreducer.loginMsg,
    loginCode: state.loginreducer.loginCode,
  }));

  useEffect(() => {
    const loginfun = async () => {
      if (loginCode == false && loginMsg) {
        TostMessage(loginMsg.toString());
        dispatch(resetLoginCode());
      } else if (loginCode == true && loginMsg) {
        TostMessage(loginMsg.toString());
        await AsyncStorage.setItem(
          'LOGIN_DATA',
          JSON.stringify(loginData.user),
        );
        await AsyncStorage.setItem('userActive', '1');
        await AsyncStorage.setItem('screenName', 'home');
        await AsyncStorage.setItem('access_token', loginData.token);
        RNRestart.restart();
        dispatch(resetLoginCode());
      }
    };
    loginfun();
  }, [loginCode]);

  const [passwordEye, setpasswordEye] = useState(true);

  //handle Pass Eye
  const handlePassEye = () => {
    setpasswordEye(!passwordEye);
  };

  const [email, setEmail] = useState('testpracticaluser001@mailinator.com');
  const [password, setPassword] = useState('Test@123');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [isClick, setisClick] = useState(0);

  //handle email
  const handleemail = e => {
    setEmail(e);
    if (e.trim() !== '') setemailError('');
  };

  //handle Pass
  const handlePass = e => {
    setPassword(e);
    if (e.trim() !== '') setpasswordError('');
  };

  //handle Login
  const handleLogin = () => {
    let valid = true;
    if (email.trim() === '') {
      setemailError('Email is required');
      valid = false;
    }
    if (password.trim() === '') {
      setpasswordError('Password is required');
      valid = false;
    }
    if (!valid) return;

    setisClick(1);

    let reqdata = {
      email: email,
      password: password,
      platform: 'app',
    };
    dispatch(login(reqdata));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar
        backgroundColor={colors.statusbarcolor}
        barStyle="dark-content"
      />
      <Text style={styles.logo}>Pliē</Text>

      <View style={styles.imageContainer}>
        <MaterialIcons name="image-outline" size={40} color={colors.black} />
      </View>

      <View style={styles.LoginContainer}>
        <View>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            cursorColor="black"
            activeOutlineColor="white"
            mode="outlined"
            outlineColor="white"
            onChangeText={e => handleemail(e)}
            value={email}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            cursorColor="black"
            activeOutlineColor="white"
            mode="outlined"
            outlineColor="white"
            right={
              <TextInput.Icon
                icon={passwordEye ? 'eye-off' : 'eye'}
                onPress={() => handlePassEye()}
              />
            }
            secureTextEntry={passwordEye}
            onChangeText={e => handlePass(e)}
            value={password}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.signContainer}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => handleLogin()}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signUpContainer}>
            <Text>Not a member? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpLink}>Sign Up Here</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.socialLoginContainer}>
            <View style={styles.separator}>
              <Text>or Sign In with:</Text>
            </View>
            <View style={styles.socialButtons}>
              <View style={styles.iconContainer}>
                <MaterialIcons name="google" size={30} color={'black'} />
              </View>
              <View style={styles.iconContainer}>
                <MaterialIcons name="apple" size={30} color={'black'} />
              </View>
              <View style={styles.iconContainer}>
                <MaterialIcons name="facebook" size={30} color={'black'} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <TouchableOpacity>
            <Text style={styles.guestLink}>Enter as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.statusbarcolor,
    height: '100%',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 50,
  },
  imageContainer: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoginContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  inputLabel: {
    color: colors.black,
    fontSize: 17,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginVertical: 8,
    color: '#007BFF',
  },
  signContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  signInButton: {
    backgroundColor: '#21D393',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    marginBottom: 15,
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  signInButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'flex-end',
  },
  signUpLink: {
    color: '#007BFF',
  },
  socialLoginContainer: {
    alignItems: 'center',
  },
  separator: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  bottomcontainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  guestLink: {
    color: '#007BFF',
  },
  iconContainer: {
    justifyContent: 'center',
    backgroundColor: colors.white,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
    padding: 5,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
});

export default Login;
