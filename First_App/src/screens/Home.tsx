import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../components/Header';
import {Loader} from '../components/Loader';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HomeProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [showLoader, setShowLoader] = useState(false);
  const [checkUserSignIn, setCheckUserSignIn] = useState(false);

  let checkUserSignedIn = useSelector(
    (state: any) => state.checkSignIn.userSignIn,
  );

  useEffect(() => {
    AsyncStorage.getItem('user').then((value: any) => {
      const data = JSON.parse(value);
      if (data) {
        setCheckUserSignIn(data.isSignIn);
      }
    });
  }, []);

  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  }, []);

  const onPressButton = () => {
    if (checkUserSignIn || checkUserSignedIn) {
      navigation.navigate('Dashboard');
    } else {
      navigation.navigate('SignIn');
    }
  };

  return (
    <View style={{flex: 1}}>
      <Loader visible={showLoader} />
      <HeaderBar
        navigateTitle={
          checkUserSignedIn || checkUserSignIn ? 'Dashboard' : 'Sign In'
        }
        title={'Home'}
        onPressNavigationTitle={() => onPressButton()}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '80%',
        }}>
        <Text>Homepage</Text>
      </View>
    </View>
  );
};

export default Home;
