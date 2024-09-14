import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {colors} from '../../assets/res/style/colors';

const Header = props => {
  const {Title, subtitle} = props;

  return (
    <View style={styles.header}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <Text style={styles.title}>{Title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
  },
});

export default Header;
