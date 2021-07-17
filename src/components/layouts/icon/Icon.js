import React from 'react'
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FAIcon5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DefineIcon from './DefineIcon';
import Theme from './../../../utils/helpers/Theme';


const getIconFont = (type) => {
    switch (type) {
        case DefineIcon.Fontisto:
            return Fontisto;
        case DefineIcon.MaterialIcon:
            return MaterialIcon;
        case DefineIcon.EvilIcon:
            return EvilIcon;
        case DefineIcon.Feather:
            return Feather;
        case DefineIcon.AntDesign:
            return AntDesign;
        case DefineIcon.SimpleLineIcon:
            return SimpleLineIcon;
        case DefineIcon.ZocialIcon:
            return ZocialIcon;
        case DefineIcon.FoundationIcon:
            return FoundationIcon;
        case DefineIcon.FAIcon5:
            return FAIcon5;
        case DefineIcon.FAIcon:
            return FAIcon;
        case DefineIcon.Ionicon:
            return Ionicon;
        case DefineIcon.MaterialCommunityIcon:
            return MaterialCommunityIcon;
        case DefineIcon.EntypoIcon:
            return EntypoIcon;
        case DefineIcon.OcticonIcon:
            return OcticonIcon;
        default:
            return FAIcon;
    }
};

export default function Icon({ type, color = Theme.COLOR_BLACK, size = 22, name, ...props }) {
    const FontICon = getIconFont(type);
    return <FontICon color={color} size={size} name={name} {...props} />;
}
