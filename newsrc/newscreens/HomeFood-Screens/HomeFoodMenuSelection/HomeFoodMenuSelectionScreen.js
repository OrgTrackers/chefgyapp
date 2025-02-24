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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcons from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from 'react-native-svg';
import {Card} from 'react-native-paper';
import { HomeFoodMenuSelectionStyles } from './HomeFoodMenuSelectionScreen.styles';
import { GlobalCss } from '../../../newassets/GlobalStyles/GlobalCss.styles';

//Footer
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { Navigation } from 'lucide-react-native';


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
    MenuName: 'Royal Menu',
    CategoryTypes: [
      {
        Id: 1,
        Category: 'Breakfast',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            Items: [
              {
                Id: 1,
                Image: require('../../../newassets/images/MenuItems/Item_1.png'),
                Name: 'Biryani',
                Description:
                  'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
              },
              {
                Id: 2,
                Image: require('../../../newassets/images/MenuItems/Item_2.png'),
                Name: 'Idly',
                Description:
                  'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
              },
              {
                Id: 3,
                Image: require('../../../newassets/images/MenuItems/Item_3.png'),
                Name: 'Masala Dosa',
                Description:
                  'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
              },
              {
                Id: 4,
                Image: require('../../../newassets/images/MenuItems/Item_4.png'),
                Name: 'Sambar rice',
                Description:
                  'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
              },
              {
                Id: 5,
                Image: require('../../../newassets/images/MenuItems/Item_5.png'),
                Name: 'Noodles',
                Description:
                  'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
              },
            ],
          },
          {
            Id: 2,
            ItemCategoryName: 'Japanese',
            Items: [
                {
                  Id: 1,
                  Image: require('../../../newassets/images/MenuItems/Item_1.png'),
                  Name: 'Biryani',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 2,
                  Image: require('../../../newassets/images/MenuItems/Item_2.png'),
                  Name: 'Idly',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 3,
                  Image: require('../../../newassets/images/MenuItems/Item_3.png'),
                  Name: 'Masala Dosa',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 4,
                  Image: require('../../../newassets/images/MenuItems/Item_4.png'),
                  Name: 'Sambar rice',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 5,
                  Image: require('../../../newassets/images/MenuItems/Item_5.png'),
                  Name: 'Noodles',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
            ],
          },
          {
            Id: 3,
            ItemCategoryName: 'Korean',
            Items: [
                {
                  Id: 1,
                  Image: require('../../../newassets/images/MenuItems/Item_1.png'),
                  Name: 'Biryani',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 2,
                  Image: require('../../../newassets/images/MenuItems/Item_2.png'),
                  Name: 'Idly',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 3,
                  Image: require('../../../newassets/images/MenuItems/Item_3.png'),
                  Name: 'Masala Dosa',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 4,
                  Image: require('../../../newassets/images/MenuItems/Item_4.png'),
                  Name: 'Sambar rice',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 5,
                  Image: require('../../../newassets/images/MenuItems/Item_5.png'),
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
        Category: 'Lunch',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            Items: [
                {
                  Id: 1,
                  Image: require('../../../newassets/images/MenuItems/Item_1.png'),
                  Name: 'Biryani',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 2,
                  Image: require('../../../newassets/images/MenuItems/Item_2.png'),
                  Name: 'Idly',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 3,
                  Image: require('../../../newassets/images/MenuItems/Item_3.png'),
                  Name: 'Masala Dosa',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 4,
                  Image: require('../../../newassets/images/MenuItems/Item_4.png'),
                  Name: 'Sambar rice',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 5,
                  Image: require('../../../newassets/images/MenuItems/Item_5.png'),
                  Name: 'Noodles',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
            ],
          },
        ],
      },
      {
        Id: 3,
        Category: 'Dinner',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
            Items: [
                {
                  Id: 1,
                  Image: require('../../../newassets/images/MenuItems/Item_1.png'),
                  Name: 'Biryani',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 2,
                  Image: require('../../../newassets/images/MenuItems/Item_2.png'),
                  Name: 'Idly',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 3,
                  Image: require('../../../newassets/images/MenuItems/Item_3.png'),
                  Name: 'Masala Dosa',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 4,
                  Image: require('../../../newassets/images/MenuItems/Item_4.png'),
                  Name: 'Sambar rice',
                  Description:
                    'Food items bring flavor, nutrition, and joy to every meal, from fresh fruits to savory dishes',
                },
                {
                  Id: 5,
                  Image: require('../../../newassets/images/MenuItems/Item_5.png'),
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
];

const HomeFoodMenuSelectionScreen = () => {
  const [activeDay, setActiveDay] = useState('Day 1');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItemCategory, setSelectedItemCategory] = useState(null);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  const handleTabPres = Day => {
    setActiveDay(Day.Name);
  };
  const increaseCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decreaseCount = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };
  return (
    <View style={GlobalCss.pageLayout}>
      <View style={GlobalCss.HeaderContainer}>
        <TouchableOpacity style={HomeFoodMenuSelectionStyles.HeaderContent} onPress={()=>navigation.navigate('HomeFoodSelectionScreen')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={HomeFoodMenuSelectionStyles.PageName}>Home Food Menu Selection</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        <View style={HomeFoodMenuSelectionStyles.Restaurant_Info_Container}>
          <View style={HomeFoodMenuSelectionStyles.Best_Container}>
            <MCIcons name="trophy" size={12} color="#F7D000" />
            <Text style={HomeFoodMenuSelectionStyles.Best_Text}>Best in all</Text>
          </View>
          <View style={HomeFoodMenuSelectionStyles.Restaurant_Name_Rating_Container}>
            <View style={HomeFoodMenuSelectionStyles.Restaurant_Name_Container}>
              <Text style={HomeFoodMenuSelectionStyles.Restaurant_Name_Text}>
               Andrew Doraz
              </Text>
            </View>
            <View style={HomeFoodMenuSelectionStyles.Restaurant_Rating_Container}>
              <MCIcons name="star" size={12} color="#ffff" />
              <Text style={HomeFoodMenuSelectionStyles.Rating_Text}>4.5</Text>
            </View>
          </View>
          <View style={HomeFoodMenuSelectionStyles.Distance_Container}>
            <Text style={HomeFoodMenuSelectionStyles.Distance_Text}>30 - 40 min</Text>
            <Text style={HomeFoodMenuSelectionStyles.Distance_Separater}>.</Text>
            <Text style={HomeFoodMenuSelectionStyles.Distance_Text}>15 km</Text>
            <Text style={HomeFoodMenuSelectionStyles.Distance_Separater}>.</Text>
            <Text style={HomeFoodMenuSelectionStyles.Distance_Text}>Kukatpally</Text>
          </View>
        </View>
        <View style={HomeFoodMenuSelectionStyles.DaysContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dayList.map((DayItem, DayIndex) => (
              <TouchableOpacity
                key={DayIndex}
                style={[
                    HomeFoodMenuSelectionStyles.DayCard,
                  activeDay === DayItem.Name && GlobalCss.ThemeBackgroundColor,
                ]}
                onPress={() => handleTabPres(DayItem)}>
                <Text
                  style={[
                    HomeFoodMenuSelectionStyles.DayDate,
                    activeDay === DayItem.Name &&
                    HomeFoodMenuSelectionStyles.DayDateActiveText,
                  ]}>
                  {DayItem.Date}
                </Text>
                <Text
                  style={[
                    HomeFoodMenuSelectionStyles.DayName,
                    activeDay === DayItem.Name &&
                    HomeFoodMenuSelectionStyles.DayNameActiveText,
                  ]}>
                  {DayItem.Name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {activeDay === 'Day 1' && (
          <View style={HomeFoodMenuSelectionStyles.Menu_Container}>
            {MenusData.map(menu => (
              <View key={menu.Id}>
                <TouchableOpacity
                  style={HomeFoodMenuSelectionStyles.menuButton}
                  onPress={() =>
                    setSelectedMenu(selectedMenu === menu.Id ? null : menu.Id)
                  }>
                  <Text style={HomeFoodMenuSelectionStyles.Accordion_Header_Text}>
                    {menu.MenuName}
                  </Text>
                  <View style={HomeFoodMenuSelectionStyles.Details_Content}>
                    <Text style={HomeFoodMenuSelectionStyles.Label}>Price :</Text>
                    <Text style={HomeFoodMenuSelectionStyles.Details_Text}>
                      Rs.2000 /-
                    </Text>
                  </View>
                  <TouchableOpacity style={HomeFoodMenuSelectionStyles.Add_Menu_Button}>
                    <Text style={HomeFoodMenuSelectionStyles.Add_Menu_Button_Text}>Add Menu</Text>
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
                  <View style={HomeFoodMenuSelectionStyles.subContainer}>
                    <Card style={HomeFoodMenuSelectionStyles.Menu_Details_Container}>
                      <Text style={HomeFoodMenuSelectionStyles.Menu_Details_Header}>
                        Our Royal Menu With Regular Prices
                      </Text>
                      <View style={HomeFoodMenuSelectionStyles.Details_Content}>
                        <Text style={HomeFoodMenuSelectionStyles.Label}>Price :</Text>
                        <Text style={HomeFoodMenuSelectionStyles.Details_Text}>
                          Rs.2000 /-
                        </Text>
                      </View>
                      <View style={HomeFoodMenuSelectionStyles.Details_Content}>
                        <Text style={HomeFoodMenuSelectionStyles.Label}>
                          Serves #No.of :
                        </Text>
                        <Text style={HomeFoodMenuSelectionStyles.Details_Text}>
                          10 - 50 People
                        </Text>
                      </View>
                      <View style={HomeFoodMenuSelectionStyles.Details_Content}>
                        <Text style={HomeFoodMenuSelectionStyles.Label}>
                          Serves with in :
                        </Text>
                        <Text style={HomeFoodMenuSelectionStyles.Details_Text}>
                          15 km
                        </Text>
                      </View>
                    </Card>
                    {menu.CategoryTypes.map(category => (
                      <View key={category.Id}>
                        <TouchableOpacity
                          style={HomeFoodMenuSelectionStyles.categoryButton}
                          onPress={() =>
                            setSelectedCategory(
                              selectedCategory === category.Id
                                ? null
                                : category.Id,
                            )
                          }>
                          <Text
                            style={
                                HomeFoodMenuSelectionStyles.Accordion_Category_Header_Text
                            }>
                            {category.Category}
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
                          <View style={HomeFoodMenuSelectionStyles.subContainer}>
                            {category.ItemCategory.map(itemCategory => (
                              <View key={itemCategory.Id}>
                                <TouchableOpacity
                                  style={HomeFoodMenuSelectionStyles.itemCategoryButton}
                                  onPress={() =>
                                    setSelectedItemCategory(
                                      selectedItemCategory === itemCategory.Id
                                        ? null
                                        : itemCategory.Id,
                                    )
                                  }>
                                  <Text
                                    style={
                                        HomeFoodMenuSelectionStyles.Accordion_Item_Category_Text
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
                                {selectedItemCategory === itemCategory.Id && (
                                  <View
                                    style={HomeFoodMenuSelectionStyles.subContainer}>
                                    {itemCategory.Items.map(DishItem => (
                                      <View key={DishItem.Id}>
                                        <Card
                                          style={
                                            HomeFoodMenuSelectionStyles.DishItemCard
                                          }>
                                          <View
                                            style={
                                                HomeFoodMenuSelectionStyles.DishItemCardbody
                                            }>
                                            <View
                                              style={
                                                HomeFoodMenuSelectionStyles.DishImageContent
                                              }>
                                              <Image
                                                source={DishItem.Image}
                                                style={
                                                    HomeFoodMenuSelectionStyles.DishImage
                                                }
                                              />
                                            </View>
                                            <View
                                              style={
                                                HomeFoodMenuSelectionStyles.DishDetailsContent
                                              }>
                                              <Text
                                                style={
                                                    HomeFoodMenuSelectionStyles.DishName
                                                }>
                                                {DishItem.Name}
                                              </Text>
                                              <Text
                                                style={
                                                    HomeFoodMenuSelectionStyles.DishDescription
                                                }
                                                numberOfLines={3}>
                                                {DishItem.Description}
                                              </Text>
                                            </View>
                                          </View>
                                          <View
                                            style={
                                                HomeFoodMenuSelectionStyles.AddRemoveButtons
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
                                              style={HomeFoodMenuSelectionStyles.Count}>
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
                                )}
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
      </ScrollView>
      <View style={GlobalCss.FooterContainer}>
        <View style={HomeFoodMenuSelectionStyles.FooterButtonContainer}>
          <TouchableOpacity
            style={[
                HomeFoodMenuSelectionStyles.FooterButton,
              GlobalCss.ThemeBackgroundColor,
            ]} onPress={()=>navigation.navigate('HomeFoodOrderSummaryScreen')}>
            <Text style={HomeFoodMenuSelectionStyles.FooterButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeFoodMenuSelectionScreen;
