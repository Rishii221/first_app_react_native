import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import HeaderBar from '../components/Header';
import {Loader} from '../components/Loader';
import {setSignInUserData} from '../redux/action';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../utils/api';
interface DashboardProps {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
    reset: any;
  };
}

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const [responseData, setResponseData] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const api = axios.create({
    baseURL: API_URL,
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      setShowLoader(true);
      const response = await api.get(`/posts?_page=${page}&_limit=${pageSize}`);
      setShowLoader(false);
      setResponseData(response.data);
      const linkHeader = response.headers.link;
      setHasNextPage(linkHeader && linkHeader.includes('rel="next"'));
      const commentsData = await fetchComments();
      setComments(commentsData);
    } catch (error) {
      throw error;
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get('/comments');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getCommentCount = (postId: number): number => {
    const postComments = comments.filter(
      (getComment: any) => getComment.postId === postId,
    );
    return postComments.length;
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const onPressSignout = async () => {
    const data = await AsyncStorage.getItem('user');
    if (data) {
      const parseData = JSON.parse(data);
      parseData.isSignIn = false;
      await AsyncStorage.setItem('user', JSON.stringify(parseData));
    }
    dispatch(setSignInUserData(false));
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return (
    <>
      <HeaderBar
        title={'Dashboard'}
        navigateTitle={'SignOut'}
        backIcon={require('../assets/back.png')}
        onPressBackIcon={() => {
          setShowLoader(true);
          navigation.navigate('Home');
        }}
        onPressNavigationTitle={() => onPressSignout()}
      />
      <Loader visible={showLoader} />
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <Text style={{color: '#ffffff', fontSize: 14}}>{responseData?.id}</Text>

        {responseData.map((item: any) => (
          <View key={item.id} style={styles.cardContainer}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
              {item?.title}
            </Text>
            <Text style={{color: '#000', fontSize: 14}}>{item?.body}</Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '600',
              }}>{`Comments: ${getCommentCount(item.id)}`}</Text>
          </View>
        ))}

        <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
          {responseData.length != 0 && (
            <>
              <TouchableOpacity onPress={handlePrevPage} disabled={page === 1}>
                <Text
                  style={
                    page === 1
                      ? styles.disablePaginationButton
                      : styles.paginationButton
                  }>
                  Previous
                </Text>
              </TouchableOpacity>
              <Text>{`Page ${page}`}</Text>
              <TouchableOpacity
                onPress={handleNextPage}
                disabled={!hasNextPage}>
                <Text
                  style={
                    !hasNextPage
                      ? styles.disablePaginationButton
                      : styles.paginationButton
                  }>
                  Next
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignSelf: 'center',
  },

  cardContainer: {
    padding: 10,
    backgroundColor: 'gray',
    marginBottom: 10,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
  },

  paginationButton: {
    fontSize: 14,
    fontWeight: '700',
    color : '#000'
  },

  disablePaginationButton: {
    color: 'gray',
  },
});

export default Dashboard;
