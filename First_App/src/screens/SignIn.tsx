import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Loader} from '../components/Loader';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setSignInUserData} from '../redux/action';
interface SigninProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const SignIn: React.FC<SigninProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailErr, setIsEmailErr] = useState(false);
  const [isPasswordErr, setIsPasswordErr] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();

  const initialState = {
    isSignIn: false,
  };

  useEffect(() => {
    updateButtonState(email, password);
  }, []);

  const onChangeUsername = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    setIsEmailErr(!isValidEmail);
    setEmail(value);
    updateButtonState(value, password);
  };

  const onChangePassword = (value: string) => {
    const isValidPassword = value.length >= 8;
    setIsPasswordErr(!isValidPassword);
    setPassword(value);
    updateButtonState(email, value);
  };

  const updateButtonState = (emailValue: string, passwordValue: string) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const isValidPassword = passwordValue.length >= 8;

    setIsDisabled(
      !(isValidEmail && isValidPassword) ||
        emailValue === '' ||
        passwordValue === '',
    );
  };

  const handleSignInPress = async () => {
    setShowLoader(true);
    if (!isDisabled) {
      setShowLoader(false);
      initialState['isSignIn'] = true;
      await AsyncStorage.setItem('user', JSON.stringify(initialState));
      dispatch(setSignInUserData(true));
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Loader visible={showLoader} />
      <View style={styles.signInContainer}>
        <Image
          source={require('../assets/download.png')}
          style={styles.iconStyle}
        />
        <Text style={styles.signInTitle}>Sign In</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Text style={styles.textUsername}>Username</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={value => onChangeUsername(value)}
              autoCapitalize="none"
              value={email}
            />
            {isEmailErr && (
              <View style={{alignItems: 'flex-start', top: 10}}>
                <Text style={{color: 'red'}}>
                  * Please enter valid email address
                </Text>
              </View>
            )}

            <Text style={styles.textPassword}>Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={value => onChangePassword(value)}
              autoCapitalize="none"
              value={password}
              maxLength={10}
            />
            {isPasswordErr && (
              <View style={{alignItems: 'flex-start', top: 10}}>
                <Text style={{color: 'red'}}>
                  * Please enter valid password(min length 8)
                </Text>
              </View>
            )}
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={
                isDisabled ? styles.disableSignInButton : styles.signInButton
              }
              onPress={handleSignInPress}
              disabled={isDisabled}>
              <Text style={styles.textSignin}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderColor: '#fff',
    backgroundColor: 'gray',
  },
  textInput: {
    width: '100%',
    backgroundColor: 'gray',
    height: '25%',
    borderRadius: 10,
    top: 5,
    padding: 10,
    paddingTop: 10,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: '#085B70',
    justifyContent: 'center',
    width: '95%',
    height: '35%',
    borderRadius: 10,
    alignItems: 'center',
  },
  disableSignInButton: {
    backgroundColor: '#5B8088',
    justifyContent: 'center',
    width: '95%',
    height: '35%',
    borderRadius: 10,
    alignItems: 'center',
  },
  iconStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  inputContainer: {
    backgroundColor: '#fff',
    height: '60%',
    width: '90%',
    borderRadius: 10,
  },
  inputSubContainer: {
    padding: 10,
    height: '60%',
    justifyContent: 'center',
  },
  textUsername: {
    fontWeight: '600',
    color: '#000',
  },
  textPassword: {
    marginTop: 20,
    fontWeight: '600',
    color: '#000',
  },
  textSignin: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default SignIn;
