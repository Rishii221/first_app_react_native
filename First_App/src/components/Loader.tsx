import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

interface loaderProps {
    visible : boolean;
}

export  const Loader: React.FC<loaderProps> = ({visible}) => {
  return (
    <Modal transparent={true} visible={visible}>
    <View style={styles.containerForLoader}>
      <ActivityIndicator size="large" color="#5C78FF" />
    </View>
  </Modal>
  )
}

const styles = StyleSheet.create({
    containerForLoader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
});