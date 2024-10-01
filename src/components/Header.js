import React from "react";
import { StyleSheet,View ,TouchableOpacity} from "react-native";

//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//styles
import { globalStyle } from "../assets/styles/GlobalStyles";


const Header = ({onBackPress,onMenuPress}) => {
    return(
        <View style={styles.Header_Container}>
            <TouchableOpacity onPress={onBackPress}>
                <Ionicons name="chevron-back" size={globalStyle.g_appPageHeaderIconsSize.fontSize} color={globalStyle.g_appPageHeaderIconsColors.color} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onMenuPress}>
                <Ionicons name="ellipsis-vertical" size={globalStyle.g_appPageHeaderIconsSize.fontSize} color={globalStyle.g_appPageHeaderIconsColors.color} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Header_Container:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:15
    }
})

export default Header