import {Dimensions, StyleSheet} from 'react-native';

export const FooterComponentStyles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
      },
      footerItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      },
})