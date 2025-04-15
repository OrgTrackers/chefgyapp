import React, {useState, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch,Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from 'react-native-svg';
import {Card,Checkbox,RadioButton} from 'react-native-paper';
import {MenuSelectionStyles} from './MenuSelection.styles';
import {GlobalCss} from '../../newassets/GlobalStyles/GlobalCss.styles';
import { Camera,Video,Building,Sparkles  } from "lucide-react-native";

//Footer
import FooterComponent from '../../newcomponents/Footer/FooterComponent';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {Navigation} from 'lucide-react-native';


const dayList = [
  {
    Id: 1,
    Name: 'Day 1',
    Date: 27,
  },
  {
    Id: 2,
    Name: 'Day 2',
    Date: 28,
  },
  {
    Id: 3,
    Name: 'Day 3',
    Date: 29,
  },
  {
    Id: 4,
    Name: 'Day 4',
    Date: 30,
  },
  {
    Id: 5,
    Name: 'Day 5',
    Date: 31,
  },
];

const MenusData = [
  {
    Id: 1,
    Category: 'Breakfast',
    CategoryTypes: [
      {
        Id: 1,
        MenuName: 'Royal Menu',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
          {
            Id: 2,
            ItemCategoryName: 'Japanese',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        Id: 2,
        MenuName: 'Standared Menu',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
          {
            Id: 2,
            ItemCategoryName: 'Japanese',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        Id: 3,
        MenuName: 'Delux Menu',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
          {
            Id: 2,
            ItemCategoryName: 'Japanese',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    Id: 2,
    Category: 'Lunch',
    CategoryTypes: [
      {
        Id: 1,
        MenuName: 'Royal Menu',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
          {
            Id: 2,
            ItemCategoryName: 'Japanese',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        Id: 2,
        MenuName: 'Standared Menu',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
          {
            Id: 2,
            ItemCategoryName: 'Japanese',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        Id: 3,
        MenuName: 'Delux Menu',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
          {
            Id: 2,
            ItemCategoryName: 'Japanese',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    Id: 3,
    Category: 'Dinner',
    CategoryTypes: [
      {
        Id: 1,
        MenuName: 'Royal Menu',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
          {
            Id: 2,
            ItemCategoryName: 'Japanese',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        Id: 2,
        MenuName: 'Standared Menu',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
          {
            Id: 2,
            ItemCategoryName: 'Japanese',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        Id: 3,
        MenuName: 'Delux Menu',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
          {
            Id: 2,
            ItemCategoryName: 'Japanese',
            MenuTypes: [
              {
                Id: 1,
                MenuName: 'Salads',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 2,
                MenuName: 'Main Course',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
              {
                Id: 3,
                MenuName: 'Starters',
                Items: [
                  {
                    Id: 1,
                    Image: require('../../newassets/images/MenuItems/Item_1.png'),
                    Name: 'Biryani',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 2,
                    Image: require('../../newassets/images/MenuItems/Item_2.png'),
                    Name: 'Idly',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 3,
                    Image: require('../../newassets/images/MenuItems/Item_3.png'),
                    Name: 'Masala Dosa',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 4,
                    Image: require('../../newassets/images/MenuItems/Item_4.png'),
                    Name: 'Sambar rice',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                  {
                    Id: 5,
                    Image: require('../../newassets/images/MenuItems/Item_5.png'),
                    Name: 'Noodles',
                    Description:
                      'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const photographerVendors = [
  { id: 1, name: 'Creative Clicks Photography  Rs.5000', rating: 4.5 },
  { id: 2, name: 'Perfect Moments Studio Rs.4500', rating: 4.3 },
  { id: 3, name: 'Capture Dreams Rs.4000', rating: 4.7 },
  { id: 4, name: 'Premium Shots Rs.3000', rating: 4.1 },
];

const videographerVendors = [
  { id: 1, name: 'Wedding Films Pro', rating: 4.6 },
  { id: 2, name: 'Cinematic Memories', rating: 4.4 },
  { id: 3, name: 'Event Video Experts', rating: 4.2 },
  { id: 4, name: 'Visual Story Creators', rating: 4.8 },
];

const decorationVendors = [
  { id: 1, name: 'Elegant Decor Solutions', rating: 4.5 },
  { id: 2, name: 'Floral Fantasy', rating: 4.9 },
  { id: 3, name: 'Dream Theme Decorations', rating: 4.3 },
  { id: 4, name: 'Royal Event Decor', rating: 4.7 },
];

const conventionHallVendors = [
  { id: 1, name: 'Grand Celebration Hall', rating: 4.4 },
  { id: 2, name: 'Royal Palace Convention', rating: 4.6 },
  { id: 3, name: 'Elite Events Center', rating: 4.8 },
  { id: 4, name: 'Luxury Banquet Hall', rating: 4.3 },
];

const couponsData = [
  { 
    id: 1, 
    brand: 'AMEXFEST', 
    Image: require('../../newassets/images/Home/HCate-1.jpg'),
    discount: '10', 
    validTill: '31 Oct 2024' 
  },
  { 
    id: 2, 
    brand: 'HDFCMEX', 
    Image: require('../../newassets/images/Home/HCate-1.jpg'),
    discount: '20', 
    validTill: '31 Oct 2024' 
  },
  { 
    id: 3, 
    brand: 'ICICIFLO', 
    Image: require('../../newassets/images/Home/HCate-1.jpg'),
    discount: '25', 
    validTill: '31 Oct 2024' 
  },
  { 
    id: 4, 
    brand: 'CREDFEX', 
    Image: require('../../newassets/images/Home/HCate-1.jpg'),
    discount: '25', 
    validTill: '31 Oct 2024' 
  },
];


const MenuSelection = () => {
  const [activeDay, setActiveDay] = useState('Day 1');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItemCategory, setSelectedItemCategory] = useState(null);
  const [selectedMenuType, setSelectedMenuType] = useState(null);

  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Discounts');

  const [photographerRequired, setPhotographerRequired] = useState(false);
  const [videographerRequired, setVideographerRequired] = useState(false);
  const [decorationRequired, setDecorationRequired] = useState(false);
  const [conventionHallRequired, setConventionHallRequired] = useState(false);

  // Modal visibility states
  const [photographerModalVisible, setPhotographerModalVisible] = useState(false);
  const [videographerModalVisible, setVideographerModalVisible] = useState(false);
  const [decorationModalVisible, setDecorationModalVisible] = useState(false);
  const [conventionHallModalVisible, setConventionHallModalVisible] = useState(false);
  const [couponsModalVisible, setCouponsModalVisible] = useState(false);

  // Selected vendors states
  const [selectedPhotographers, setSelectedPhotographers] = useState([]);
  const [selectedVideographers, setSelectedVideographers] = useState([]);
  const [selectedDecorators, setSelectedDecorators] = useState([]);
  const [selectedConventionHalls, setSelectedConventionHalls] = useState([]);

  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleTabPres = Day => {
    setActiveDay(Day.Name);
  };
  const increaseCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decreaseCount = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const togglePhotographerRequired = () => {
    setPhotographerRequired(previousState => {
      const newState = !previousState;
      if (newState) {
        setPhotographerModalVisible(true);
      } else {
        setSelectedPhotographers([]);
      }
      return newState;
    });
  };

  const toggleVideographerRequired = () => {
    setVideographerRequired(previousState => {
      const newState = !previousState;
      if (newState) {
        setVideographerModalVisible(true);
      } else {
        setSelectedVideographers([]);
      }
      return newState;
    });
  };

  const toggleDecorationRequired = () => {
    setDecorationRequired(previousState => {
      const newState = !previousState;
      if (newState) {
        setDecorationModalVisible(true);
      } else {
        setSelectedDecorators([]);
      }
      return newState;
    });
  };

  const toggleConventionHallRequired = () => {
    setConventionHallRequired(previousState => {
      const newState = !previousState;
      if (newState) {
        setConventionHallModalVisible(true);
      } else {
        setSelectedConventionHalls([]);
      }
      return newState;
    });
  };

  // Checkbox toggle handlers
  const togglePhotographerSelection = (photographer) => {
    setSelectedPhotographers(prevSelected => {
      const isSelected = prevSelected.find(item => item.id === photographer.id);
      if (isSelected) {
        return prevSelected.filter(item => item.id !== photographer.id);
      } else {
        return [...prevSelected, photographer];
      }
    });
  };

  const toggleVideographerSelection = (videographer) => {
    setSelectedVideographers(prevSelected => {
      const isSelected = prevSelected.find(item => item.id === videographer.id);
      if (isSelected) {
        return prevSelected.filter(item => item.id !== videographer.id);
      } else {
        return [...prevSelected, videographer];
      }
    });
  };

  const toggleDecoratorSelection = (decorator) => {
    setSelectedDecorators(prevSelected => {
      const isSelected = prevSelected.find(item => item.id === decorator.id);
      if (isSelected) {
        return prevSelected.filter(item => item.id !== decorator.id);
      } else {
        return [...prevSelected, decorator];
      }
    });
  };

  const toggleConventionHallSelection = (hall) => {
    setSelectedConventionHalls(prevSelected => {
      const isSelected = prevSelected.find(item => item.id === hall.id);
      if (isSelected) {
        return prevSelected.filter(item => item.id !== hall.id);
      } else {
        return [...prevSelected, hall];
      }
    });
  };

  const toggleCouponSelection = (coupon) => {
    setSelectedCoupon(selectedCoupon && selectedCoupon.id === coupon.id ? null : coupon);
  };

  // Render vendor item for lists
  const renderVendorItem = (vendor, isSelected, onToggle) => (
    <TouchableOpacity
      key={vendor.id}
      style={styles.vendorItem}
      onPress={() => onToggle(vendor)}>
      <View style={styles.vendorInfo}>
        <Text style={styles.vendorName}>{vendor.name}</Text>
        <View style={styles.ratingContainer}>
          <MCIcons name="star" size={12} color="#F7D000" />
          <Text style={styles.ratingText}>{vendor.rating}</Text>
        </View>
      </View>
      <Checkbox
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={() => onToggle(vendor)}
        color={GlobalCss.ThemeColor.color}
      />
    </TouchableOpacity>
  );

  const renderCouponItem = (coupon) => (
    <TouchableOpacity
      key={coupon.id}
      style={styles.couponItem}
      onPress={() => toggleCouponSelection(coupon)}>
      <View style={styles.couponContainer}>
        <View style={styles.couponLeft}>
          <Image source={coupon.logo} style={styles.couponLogo} />
        </View>
        <View style={styles.couponDivider} />
        <View style={styles.couponRight}>
          <Text style={styles.couponBrand}>{coupon.brand}</Text>
          <View style={styles.discountContainer}>
            <Text style={styles.discountPercentage}>{coupon.discount}</Text>
            <Text style={styles.discountText}>% OFF</Text>
          </View>
          <Text style={styles.validText}>Valid this offer till {coupon.validTill}</Text>
        </View>
        <RadioButton
          value={coupon.id.toString()}
          status={selectedCoupon && selectedCoupon.id === coupon.id ? 'checked' : 'unchecked'}
          onPress={() => toggleCouponSelection(coupon)}
          color={GlobalCss.ThemeColor.color}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={GlobalCss.pageLayout}>
      <View style={GlobalCss.HeaderContainer}>
        <TouchableOpacity
          style={MenuSelectionStyles.HeaderContent}
          onPress={() => navigation.navigate('CaterSelectionScreen')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={MenuSelectionStyles.PageName}>Menu Selection</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        <View style={MenuSelectionStyles.Restaurant_Info_Container}>
          <View style={MenuSelectionStyles.Best_Container}>
            <MCIcons name="trophy" size={12} color="#F7D000" />
            <Text style={MenuSelectionStyles.Best_Text}>Best in all</Text>
          </View>
          <View style={MenuSelectionStyles.Restaurant_Name_Rating_Container}>
            <View style={MenuSelectionStyles.Restaurant_Name_Container}>
              <Text style={MenuSelectionStyles.Restaurant_Name_Text}>
                Sri Chaithanya Hotel
              </Text>
            </View>
            <View style={MenuSelectionStyles.Restaurant_Rating_Container}>
              <MCIcons name="star" size={12} color="#ffff" />
              <Text style={MenuSelectionStyles.Rating_Text}>4.5</Text>
            </View>
          </View>
          <View style={MenuSelectionStyles.Distance_Container}>
            <Text style={MenuSelectionStyles.Distance_Text}>30 - 40 min</Text>
            <Text style={MenuSelectionStyles.Distance_Separater}>.</Text>
            <Text style={MenuSelectionStyles.Distance_Text}>15 km</Text>
            <Text style={MenuSelectionStyles.Distance_Separater}>.</Text>
            <Text style={MenuSelectionStyles.Distance_Text}>Kukatpally</Text>
          </View>
        </View>
        <View style={MenuSelectionStyles.DaysContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dayList.map((DayItem, DayIndex) => (
              <TouchableOpacity
                key={DayIndex}
                style={[
                  MenuSelectionStyles.DayCard,
                  activeDay === DayItem.Name && GlobalCss.ThemeBackgroundColor,
                ]}
                onPress={() => handleTabPres(DayItem)}>
                <Text
                  style={[
                    MenuSelectionStyles.DayDate,
                    activeDay === DayItem.Name &&
                      MenuSelectionStyles.DayDateActiveText,
                  ]}>
                  {DayItem.Date}
                </Text>
                <Text
                  style={[
                    MenuSelectionStyles.DayName,
                    activeDay === DayItem.Name &&
                      MenuSelectionStyles.DayNameActiveText,
                  ]}>
                  {DayItem.Name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {activeDay === 'Day 1' && (
          <View style={MenuSelectionStyles.Menu_Container}>
            {MenusData.map(menu => (
              <View key={menu.Id}>
                <TouchableOpacity
                  style={MenuSelectionStyles.menuButton}
                  onPress={() =>
                    setSelectedMenu(selectedMenu === menu.Id ? null : menu.Id)
                  }>
                  <Text style={MenuSelectionStyles.Accordion_Header_Text}>
                    {menu.Category}
                  </Text>
                  <View style={MenuSelectionStyles.Details_Content}>
                    <Text style={MenuSelectionStyles.Label}>Price :</Text>
                    <Text style={MenuSelectionStyles.Details_Text}>
                      Rs.2000 /-
                    </Text>
                  </View>
                  <TouchableOpacity style={MenuSelectionStyles.Add_Menu_Button}>
                    <Text style={MenuSelectionStyles.Add_Menu_Button_Text}>
                      Add Menu
                    </Text>
                  </TouchableOpacity>
                  <MCIcons
                    name={
                      selectedMenu === menu.Id
                        ? 'chevron-down'
                        : 'chevron-right'
                    }
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
                {selectedMenu === menu.Id && (
                  <View style={MenuSelectionStyles.subContainer}>
                    <Card style={MenuSelectionStyles.Menu_Details_Container}>
                      <Text style={MenuSelectionStyles.Menu_Details_Header}>
                        Our Royal Menu With Regular Prices
                      </Text>
                      <View style={MenuSelectionStyles.Details_Content}>
                        <Text style={MenuSelectionStyles.Label}>Price :</Text>
                        <Text style={MenuSelectionStyles.Details_Text}>
                          Rs.2000 /-
                        </Text>
                      </View>
                      <View style={MenuSelectionStyles.Details_Content}>
                        <Text style={MenuSelectionStyles.Label}>
                          Serves #No.of :
                        </Text>
                        <Text style={MenuSelectionStyles.Details_Text}>
                          10 - 50 People
                        </Text>
                      </View>
                      <View style={MenuSelectionStyles.Details_Content}>
                        <Text style={MenuSelectionStyles.Label}>
                          Serves with in :
                        </Text>
                        <Text style={MenuSelectionStyles.Details_Text}>
                          15 km
                        </Text>
                      </View>
                    </Card>
                    {menu.CategoryTypes.map(category => (
                      <View key={category.Id}>
                        <TouchableOpacity
                          style={MenuSelectionStyles.categoryButton}
                          onPress={() =>
                            setSelectedCategory(
                              selectedCategory === category.Id
                                ? null
                                : category.Id,
                            )
                          }>
                          <Text
                            style={
                              MenuSelectionStyles.Accordion_Category_Header_Text
                            }>
                            {category.MenuName}
                          </Text>
                          <MCIcons
                            name={
                              selectedCategory === category.Id
                                ? 'chevron-down'
                                : 'chevron-right'
                            }
                            size={16}
                            color="#000"
                          />
                        </TouchableOpacity>

                        {selectedCategory === category.Id && (
                          <View style={MenuSelectionStyles.subContainer}>
                            {category.ItemCategory.map(itemCategory => (
                              <View key={itemCategory.Id}>
                                <TouchableOpacity
                                  style={MenuSelectionStyles.itemCategoryButton}
                                  onPress={() =>
                                    setSelectedItemCategory(
                                      selectedItemCategory === itemCategory.Id
                                        ? null
                                        : itemCategory.Id,
                                    )
                                  }>
                                  <Text
                                    style={
                                      MenuSelectionStyles.Accordion_Item_Category_Text
                                    }>
                                    {itemCategory.ItemCategoryName}
                                  </Text>
                                  <MCIcons
                                    name={
                                      selectedItemCategory === itemCategory.Id
                                        ? 'chevron-down'
                                        : 'chevron-right'
                                    }
                                    size={15}
                                    color="#ffff"
                                  />
                                </TouchableOpacity>

                                {selectedItemCategory === itemCategory.Id &&
                                  itemCategory.MenuTypes.map(menuType => (
                                    <View key={menuType.Id}>
                                      <TouchableOpacity
                                        style={
                                          MenuSelectionStyles.menuTypeButton
                                        }
                                        onPress={() =>
                                          setSelectedMenuType(
                                            selectedMenuType === menuType.Id
                                              ? null
                                              : menuType.Id,
                                          )
                                        }>
                                        <Text
                                          style={
                                            MenuSelectionStyles.Accordion_Menu_Item_Text
                                          }>
                                          {menuType.MenuName}
                                        </Text>
                                        <MCIcons
                                          name={
                                            selectedMenuType === menuType.Id
                                              ? 'chevron-down'
                                              : 'chevron-right'
                                          }
                                          size={15}
                                          color="#006701"
                                        />
                                      </TouchableOpacity>

                                      {selectedMenuType === menuType.Id &&
                                        menuType.Items.map(DishItem => (
                                          <View key={DishItem.Id}>
                                            <Card
                                              style={
                                                MenuSelectionStyles.DishItemCard
                                              }>
                                              <View
                                                style={
                                                  MenuSelectionStyles.DishItemCardbody
                                                }>
                                                <View
                                                  style={
                                                    MenuSelectionStyles.DishImageContent
                                                  }>
                                                  <Image
                                                    source={DishItem.Image}
                                                    style={
                                                      MenuSelectionStyles.DishImage
                                                    }
                                                  />
                                                </View>
                                                <View
                                                  style={
                                                    MenuSelectionStyles.DishDetailsContent
                                                  }>
                                                  <Text
                                                    style={
                                                      MenuSelectionStyles.DishName
                                                    }>
                                                    {DishItem.Name}
                                                  </Text>
                                                  <Text
                                                    style={
                                                      MenuSelectionStyles.DishDescription
                                                    }
                                                    numberOfLines={3}>
                                                    {DishItem.Description}
                                                  </Text>
                                                </View>
                                              </View>
                                              <View
                                                style={
                                                  MenuSelectionStyles.AddRemoveButtons
                                                }>
                                                <TouchableOpacity
                                                  onPress={decreaseCount}>
                                                  <MCIcons
                                                    name="minus-circle-outline"
                                                    size={15}
                                                    color={
                                                      GlobalCss.ThemeColor.color
                                                    }
                                                  />
                                                </TouchableOpacity>
                                                <Text
                                                  style={
                                                    MenuSelectionStyles.Count
                                                  }>
                                                  {count}
                                                </Text>
                                                <TouchableOpacity
                                                  onPress={increaseCount}>
                                                  <MCIcons
                                                    name="plus-circle-outline"
                                                    size={15}
                                                    color={
                                                      GlobalCss.ThemeColor.color
                                                    }
                                                  />
                                                </TouchableOpacity>
                                              </View>
                                            </Card>
                                          </View>
                                        ))}
                                    </View>
                                  ))}
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
{/* Additional Services Section */}
<View style={styles.servicesContainer}>
          <Text style={styles.servicesTitle}>Additional Services Required</Text>
          
          {/* Photographer Service */}
          <View style={styles.serviceItem}>
          <Camera  size={16}/>
            <Text style={styles.serviceLabel}>Photographer Required</Text>
            <Switch
              trackColor={{ false: "#767577", true: GlobalCss.ThemeColor.color }}
              thumbColor={photographerRequired ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={togglePhotographerRequired}
              value={photographerRequired}
            />
          </View>
          {photographerRequired && selectedPhotographers.length > 0 && (
            <View style={styles.selectedVendorsContainer}>
              {selectedPhotographers.map(photographer => (
                <View key={photographer.id} style={styles.selectedVendorChip}>
                  <Text style={styles.selectedVendorText}>{photographer.name}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Videographer Service */}
          <View style={styles.serviceItem}>
          <Video   size={16}/>
            <Text style={styles.serviceLabel}>Videographer Required</Text>
            <Switch
              trackColor={{ false: "#767577", true: GlobalCss.ThemeColor.color }}
              thumbColor={videographerRequired ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleVideographerRequired}
              value={videographerRequired}
            />
          </View>
          {videographerRequired && selectedVideographers.length > 0 && (
            <View style={styles.selectedVendorsContainer}>
              {selectedVideographers.map(videographer => (
                <View key={videographer.id} style={styles.selectedVendorChip}>
                  <Text style={styles.selectedVendorText}>{videographer.name}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Decoration Service */}
          <View style={styles.serviceItem}>
          <Sparkles    size={16}/>
            <Text style={styles.serviceLabel}>Decoration Required</Text>
            <Switch
              trackColor={{ false: "#767577", true: GlobalCss.ThemeColor.color }}
              thumbColor={decorationRequired ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDecorationRequired}
              value={decorationRequired}
            />
          </View>
          {decorationRequired && selectedDecorators.length > 0 && (
            <View style={styles.selectedVendorsContainer}>
              {selectedDecorators.map(decorator => (
                <View key={decorator.id} style={styles.selectedVendorChip}>
                  <Text style={styles.selectedVendorText}>{decorator.name}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Convention Hall Service */}
          <View style={styles.serviceItem}>
          <Building   size={16}/>
            <Text style={styles.serviceLabel}>Convention Hall Required</Text>
            <Switch
              trackColor={{ false: "#767577", true: GlobalCss.ThemeColor.color }}
              thumbColor={conventionHallRequired ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleConventionHallRequired}
              value={conventionHallRequired}
            />
          </View>
          {conventionHallRequired && selectedConventionHalls.length > 0 && (
            <View style={styles.selectedVendorsContainer}>
              {selectedConventionHalls.map(hall => (
                <View key={hall.id} style={styles.selectedVendorChip}>
                  <Text style={styles.selectedVendorText}>{hall.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
       {/* Display selected coupon if any */}
        {selectedCoupon ? (
          <View style={styles.selectedCouponContainer}>
            <Text style={styles.selectedCouponTitle}>Applied Coupon:</Text>
            <View style={styles.selectedCouponContent}>
              <Text style={styles.selectedCouponText} numberOfLines={2}>
                {selectedCoupon.brand} - {selectedCoupon.discount}% OFF
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => setSelectedCoupon(null)}
              >
                <MCIcons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              MenuSelectionStyles.couponButton,
              GlobalCss.ThemeBackgroundColor,
            ]}
            onPress={() => setCouponsModalVisible(true)}>
            <MCIcons name="ticket-percent-outline" size={20} color="#FFF" />
            <Text style={MenuSelectionStyles.couponButtonText}>Apply Coupons & Offers</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

{/* Photographer Modal */}
<Modal
        animationType="slide"
        transparent={true}
        visible={photographerModalVisible}
        onRequestClose={() => setPhotographerModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Photographers</Text>
              <TouchableOpacity onPress={() => setPhotographerModalVisible(false)}>
                <MCIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.vendorList}>
              {photographerVendors.map(photographer => 
                renderVendorItem(
                  photographer, 
                  selectedPhotographers.some(item => item.id === photographer.id),
                  togglePhotographerSelection
                )
              )}
            </ScrollView>
            <TouchableOpacity 
              style={[styles.modalButton, GlobalCss.ThemeBackgroundColor]}
              onPress={() => setPhotographerModalVisible(false)}>
              <Text style={styles.modalButtonText}>Confirm Selection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Videographer Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={videographerModalVisible}
        onRequestClose={() => setVideographerModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Videographers</Text>
              <TouchableOpacity onPress={() => setVideographerModalVisible(false)}>
                <MCIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.vendorList}>
              {videographerVendors.map(videographer => 
                renderVendorItem(
                  videographer, 
                  selectedVideographers.some(item => item.id === videographer.id),
                  toggleVideographerSelection
                )
              )}
            </ScrollView>
            <TouchableOpacity 
              style={[styles.modalButton, GlobalCss.ThemeBackgroundColor]}
              onPress={() => setVideographerModalVisible(false)}>
              <Text style={styles.modalButtonText}>Confirm Selection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Decoration Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={decorationModalVisible}
        onRequestClose={() => setDecorationModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Decorators</Text>
              <TouchableOpacity onPress={() => setDecorationModalVisible(false)}>
                <MCIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.vendorList}>
              {decorationVendors.map(decorator => 
                renderVendorItem(
                  decorator, 
                  selectedDecorators.some(item => item.id === decorator.id),
                  toggleDecoratorSelection
                )
              )}
            </ScrollView>
            <TouchableOpacity 
              style={[styles.modalButton, GlobalCss.ThemeBackgroundColor]}
              onPress={() => setDecorationModalVisible(false)}>
              <Text style={styles.modalButtonText}>Confirm Selection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Convention Hall Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={conventionHallModalVisible}
        onRequestClose={() => setConventionHallModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Convention Halls</Text>
              <TouchableOpacity onPress={() => setConventionHallModalVisible(false)}>
                <MCIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.vendorList}>
              {conventionHallVendors.map(hall => 
                renderVendorItem(
                  hall, 
                  selectedConventionHalls.some(item => item.id === hall.id),
                  toggleConventionHallSelection
                )
              )}
            </ScrollView>
            <TouchableOpacity 
              style={[styles.modalButton, GlobalCss.ThemeBackgroundColor]}
              onPress={() => setConventionHallModalVisible(false)}>
              <Text style={styles.modalButtonText}>Confirm Selection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Coupons and Offers Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={couponsModalVisible}
        onRequestClose={() => setCouponsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.couponsModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Offers</Text>
              <TouchableOpacity onPress={() => setCouponsModalVisible(false)}>
                <MCIcons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            {/* Tab Buttons */}
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[
                  styles.tabButton, 
                  activeTab === 'Discounts' && styles.activeTabButton
                ]}
                onPress={() => setActiveTab('Discounts')}>
                <Text style={[
                  styles.tabButtonText,
                  activeTab === 'Discounts' && styles.activeTabButtonText
                ]}>Discounts</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.tabButton, 
                  activeTab === 'Announcements' && styles.activeTabButton
                ]}
                onPress={() => setActiveTab('Announcements')}>
                <Text style={[
                  styles.tabButtonText,
                  activeTab === 'Announcements' && styles.activeTabButtonText
                ]}>Announcements</Text>
              </TouchableOpacity>
            </View>
            
            {/* Coupons List */}
            {activeTab === 'Discounts' && (
              <ScrollView style={styles.couponsList}>
                {couponsData.map(coupon => renderCouponItem(coupon))}
              </ScrollView>
            )}
            
            {/* Announcements Content */}
            {activeTab === 'Announcements' && (
              <ScrollView style={styles.couponsList}>
                <Text style={styles.announcementText}>No current announcements</Text>
              </ScrollView>
            )}
            
            <TouchableOpacity 
              style={[styles.modalButton, GlobalCss.ThemeBackgroundColor]}
              onPress={() => setCouponsModalVisible(false)}>
              <Text style={styles.modalButtonText}>Apply Selected</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={GlobalCss.FooterContainer}>
        <View style={MenuSelectionStyles.FooterButtonContainer}>
      
          <TouchableOpacity
            style={[
              MenuSelectionStyles.FooterButton,
              GlobalCss.ThemeBackgroundColor,
            ]}
            onPress={() => navigation.navigate('OrderSummaryScreen')}>
            <Text style={MenuSelectionStyles.FooterButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  servicesContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 15,
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  serviceLabel: {
    fontSize: 16,
    color: '#444',
  },
  selectedVendorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 9,
    marginBottom: 10,
  },
  selectedVendorChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    margin: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedVendorText: {
    fontSize: 12,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  couponsModalContent: {
    // Specific styles for coupons modal
    backgroundColor: '#f9f9f9',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vendorList: {
    maxHeight: 300,
  },
  vendorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 16,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  modalButton: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },

  footerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
 

  // Selected Coupon Display
  selectedCouponContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: GlobalCss.ThemeColor.color,
  },
  selectedCouponTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: 'black',
  },
  selectedCouponContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCouponText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  couponsModalContent: {
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  modalButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: GlobalCss.ThemeColor.color,
  },
  tabButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#777',
  },
  activeTabButtonText: {
    color: GlobalCss.ThemeColor.color,
    fontWeight: '600',
  },

  // Coupons List
  couponsList: {
    maxHeight: Dimensions.get('window').height * 0.5,
  },
  couponItem: {
    marginBottom: 16,
  },
  couponContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    padding: 4,
  },
  couponLeft: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  couponLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  couponDivider: {
    height: '70%',
    width: 1,
    backgroundColor: '#EEE',
  },
  couponRight: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  couponBrand: {
    fontSize: 12,
    fontWeight: '600',
    color: '#777',
    marginBottom: 4,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  discountPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalCss.ThemeColor.color,
  },
  discountText: {
    fontSize: 14,
    fontWeight: '600',
    color: GlobalCss.ThemeColor.color,
    marginLeft: 2,
  },
  validText: {
    fontSize: 11,
    color: '#888',
  },
  
  // Empty state
  announcementText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    padding: 30,
  },
 
  container: {
    flex: 1, 
  },
  scrollView: {
    flex: 1, 
  }
});

export default MenuSelection;
