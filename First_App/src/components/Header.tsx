import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
interface HeaderBar2Props {
  title: string;
  backIcon?: any;
  navigateTitle: string;
  onPressNavigationTitle?: () => void;
  onPressBackIcon?: () => void;
}

const HeaderBar: React.FC<HeaderBar2Props> = ({
  title,
  backIcon,
  navigateTitle,
  onPressNavigationTitle,
  onPressBackIcon,
}) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        Platform.OS === 'android'
          ? {marginTop: StatusBar.currentHeight}
          : {marginTop: 0},
      ]}>
      <StatusBar backgroundColor="#0F5363" translucent={true} />

      <View style={styles.centeredRow}>
        {backIcon ? (
          <TouchableOpacity
            onPress={onPressBackIcon}
            style={styles.iconContainer}>
            <Image
              testID="test-MessageIcon"
              source={backIcon}
              style={styles.icon2}
            />
          </TouchableOpacity>
        ) : (
          <View style={{paddingLeft: 50}}></View>
        )}

        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity
          onPress={onPressNavigationTitle}
          style={styles.iconContainer}>
          <Text style={styles.rightText}>{navigateTitle}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F5363',
    justifyContent: 'center',
    textAlign: 'center',
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  title: {
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    textAlign: 'center',
  },
  rightText: {
    color: '#0000ff',
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
  },
  iconContainer: {
    padding: 5,
  },
  icon2: {
    width: 35,
    height: 35,
  },
});

export default HeaderBar;
