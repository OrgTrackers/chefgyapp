import React, {useState, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, {Path} from 'react-native-svg';
import {EventsScreenStyles} from './Events.styles';

const Our_Specials = [
  {
    Id: 1,
    Name: 'Idly',
    Rating: 4.5,
    Image: require('../../newassets/images/EventImages/Item_1.png'),
  },
  {
    Id: 2,
    Name: 'Dosa',
    Rating: 4.5,
    Image: require('../../newassets/images/EventImages/Item_2.png'),
  },
  {
    Id: 3,
    Name: 'Dhal With Rice',
    Rating: 4.5,
    Image: require('../../newassets/images/EventImages/Item_3.png'),
  },
  {
    Id: 4,
    Name: 'Noodles',
    Rating: 4.5,
    Image: require('../../newassets/images/EventImages/Item_4.png'),
  },
  {
    Id: 5,
    Name: 'Veg Soup',
    Rating: 4.5,
    Image: require('../../newassets/images/EventImages/Item_5.png'),
  },
];

const EventsScreen = () => {
  const renderItem = ({item}) => (
    <View style={EventsScreenStyles.card}>
      <Image source={item.Image} style={EventsScreenStyles.image} />
      <Text style={EventsScreenStyles.name}>{item.Name}</Text>
      <Text style={EventsScreenStyles.rating}>Rating: {item.Rating}</Text>
    </View>
  );
  return (
    <View style={EventsScreenStyles.Page_Background}>
      <View style={EventsScreenStyles.Bottom_Wave_Container}>
        <View style={EventsScreenStyles.Bottom_Wave_Box}>
          <Svg
            height={200}
            width={Dimensions.get('screen').width}
            viewBox="0 0 1440 320"
            style={EventsScreenStyles.Bottom_Wave}>
            <Path
              fill="#E8841C"
              d="M0,192L26.7,202.7C53.3,213,107,235,160,218.7C213.3,203,267,149,320,128C373.3,107,427,117,480,138.7C533.3,160,587,192,640,192C693.3,192,747,160,800,144C853.3,128,907,128,960,128C1013.3,128,1067,128,1120,133.3C1173.3,139,1227,149,1280,133.3C1333.3,117,1387,75,1413,53.3L1440,32L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
            />
          </Svg>
        </View>
      </View>

      <View style={EventsScreenStyles.Events_Container}>
        <View style={EventsScreenStyles.Header_Content}>
          <MCIcons
            name="chevron-left"
            size={45}
            color="#272727"
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <Text style={EventsScreenStyles.PageHeader}>Events</Text>
        </View>
        <View style>
            <Image source={require('../../newassets/images/EventImages/EventMain.png')} style={EventsScreenStyles.EventChefImg}/>
        </View>
        <View style={EventsScreenStyles.OurSpc_Container}>
          <Text style={EventsScreenStyles.Our_Specials_Header}>
            Our Specials
          </Text>
          <FlatList
            data={Our_Specials}
            renderItem={renderItem}
            keyExtractor={item => item.Id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={EventsScreenStyles.listContainer}
            bounces={false}
          />
        </View>
      </View>
      <TouchableOpacity style={EventsScreenStyles.Bottom_Buttons}>
        <Text style={EventsScreenStyles.Bottom_Button_Text}>Book an Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventsScreen;
