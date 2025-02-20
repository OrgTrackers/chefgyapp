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
import { ChefMenuSelectionStyles } from './ChefMenusSelectionScreen.styles';
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

const ChefMenuSelectionScreen = () => {
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
        <TouchableOpacity style={ChefMenuSelectionStyles.HeaderContent} onPress={()=>navigation.navigate('CaterSelectionScreen')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={ChefMenuSelectionStyles.PageName}>Chef Menu Selection</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        <View style={ChefMenuSelectionStyles.Restaurant_Info_Container}>
          <View style={ChefMenuSelectionStyles.Best_Container}>
            <MCIcons name="trophy" size={12} color="#F7D000" />
            <Text style={ChefMenuSelectionStyles.Best_Text}>Best in all</Text>
          </View>
          <View style={ChefMenuSelectionStyles.Restaurant_Name_Rating_Container}>
            <View style={ChefMenuSelectionStyles.Restaurant_Name_Container}>
              <Text style={ChefMenuSelectionStyles.Restaurant_Name_Text}>
               Andrew Doraz
              </Text>
            </View>
            <View style={ChefMenuSelectionStyles.Restaurant_Rating_Container}>
              <MCIcons name="star" size={12} color="#ffff" />
              <Text style={ChefMenuSelectionStyles.Rating_Text}>4.5</Text>
            </View>
          </View>
          <View style={ChefMenuSelectionStyles.Distance_Container}>
            <Text style={ChefMenuSelectionStyles.Distance_Text}>30 - 40 min</Text>
            <Text style={ChefMenuSelectionStyles.Distance_Separater}>.</Text>
            <Text style={ChefMenuSelectionStyles.Distance_Text}>15 km</Text>
            <Text style={ChefMenuSelectionStyles.Distance_Separater}>.</Text>
            <Text style={ChefMenuSelectionStyles.Distance_Text}>Kukatpally</Text>
          </View>
        </View>
        <View style={ChefMenuSelectionStyles.DaysContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dayList.map((DayItem, DayIndex) => (
              <TouchableOpacity
                key={DayIndex}
                style={[
                    ChefMenuSelectionStyles.DayCard,
                  activeDay === DayItem.Name && GlobalCss.ThemeBackgroundColor,
                ]}
                onPress={() => handleTabPres(DayItem)}>
                <Text
                  style={[
                    ChefMenuSelectionStyles.DayDate,
                    activeDay === DayItem.Name &&
                    ChefMenuSelectionStyles.DayDateActiveText,
                  ]}>
                  {DayItem.Date}
                </Text>
                <Text
                  style={[
                    ChefMenuSelectionStyles.DayName,
                    activeDay === DayItem.Name &&
                    ChefMenuSelectionStyles.DayNameActiveText,
                  ]}>
                  {DayItem.Name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {activeDay === 'Day 1' && (
          <View style={ChefMenuSelectionStyles.Menu_Container}>
            {MenusData.map(menu => (
              <View key={menu.Id}>
                <TouchableOpacity
                  style={ChefMenuSelectionStyles.menuButton}
                  onPress={() =>
                    setSelectedMenu(selectedMenu === menu.Id ? null : menu.Id)
                  }>
                  <Text style={ChefMenuSelectionStyles.Accordion_Header_Text}>
                    {menu.MenuName}
                  </Text>
                  <View style={ChefMenuSelectionStyles.Details_Content}>
                    <Text style={ChefMenuSelectionStyles.Label}>Price :</Text>
                    <Text style={ChefMenuSelectionStyles.Details_Text}>
                      Rs.2000 /-
                    </Text>
                  </View>
                  <TouchableOpacity style={ChefMenuSelectionStyles.Add_Menu_Button}>
                    <Text style={ChefMenuSelectionStyles.Add_Menu_Button_Text}>Add Menu</Text>
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
                  <View style={ChefMenuSelectionStyles.subContainer}>
                    <Card style={ChefMenuSelectionStyles.Menu_Details_Container}>
                      <Text style={ChefMenuSelectionStyles.Menu_Details_Header}>
                        Our Royal Menu With Regular Prices
                      </Text>
                      <View style={ChefMenuSelectionStyles.Details_Content}>
                        <Text style={ChefMenuSelectionStyles.Label}>Price :</Text>
                        <Text style={ChefMenuSelectionStyles.Details_Text}>
                          Rs.2000 /-
                        </Text>
                      </View>
                      <View style={ChefMenuSelectionStyles.Details_Content}>
                        <Text style={ChefMenuSelectionStyles.Label}>
                          Serves #No.of :
                        </Text>
                        <Text style={ChefMenuSelectionStyles.Details_Text}>
                          10 - 50 People
                        </Text>
                      </View>
                      <View style={ChefMenuSelectionStyles.Details_Content}>
                        <Text style={ChefMenuSelectionStyles.Label}>
                          Serves with in :
                        </Text>
                        <Text style={ChefMenuSelectionStyles.Details_Text}>
                          15 km
                        </Text>
                      </View>
                    </Card>
                    {menu.CategoryTypes.map(category => (
                      <View key={category.Id}>
                        <TouchableOpacity
                          style={ChefMenuSelectionStyles.categoryButton}
                          onPress={() =>
                            setSelectedCategory(
                              selectedCategory === category.Id
                                ? null
                                : category.Id,
                            )
                          }>
                          <Text
                            style={
                                ChefMenuSelectionStyles.Accordion_Category_Header_Text
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
                          <View style={ChefMenuSelectionStyles.subContainer}>
                            {category.ItemCategory.map(itemCategory => (
                              <View key={itemCategory.Id}>
                                <TouchableOpacity
                                  style={ChefMenuSelectionStyles.itemCategoryButton}
                                  onPress={() =>
                                    setSelectedItemCategory(
                                      selectedItemCategory === itemCategory.Id
                                        ? null
                                        : itemCategory.Id,
                                    )
                                  }>
                                  <Text
                                    style={
                                        ChefMenuSelectionStyles.Accordion_Item_Category_Text
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
                                    style={ChefMenuSelectionStyles.subContainer}>
                                    {itemCategory.Items.map(DishItem => (
                                      <View key={DishItem.Id}>
                                        <Card
                                          style={
                                            ChefMenuSelectionStyles.DishItemCard
                                          }>
                                          <View
                                            style={
                                                ChefMenuSelectionStyles.DishItemCardbody
                                            }>
                                            <View
                                              style={
                                                ChefMenuSelectionStyles.DishImageContent
                                              }>
                                              <Image
                                                source={DishItem.Image}
                                                style={
                                                    ChefMenuSelectionStyles.DishImage
                                                }
                                              />
                                            </View>
                                            <View
                                              style={
                                                ChefMenuSelectionStyles.DishDetailsContent
                                              }>
                                              <Text
                                                style={
                                                    ChefMenuSelectionStyles.DishName
                                                }>
                                                {DishItem.Name}
                                              </Text>
                                              <Text
                                                style={
                                                    ChefMenuSelectionStyles.DishDescription
                                                }
                                                numberOfLines={3}>
                                                {DishItem.Description}
                                              </Text>
                                            </View>
                                          </View>
                                          <View
                                            style={
                                                ChefMenuSelectionStyles.AddRemoveButtons
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
                                              style={ChefMenuSelectionStyles.Count}>
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
        <View style={ChefMenuSelectionStyles.FooterButtonContainer}>
          <TouchableOpacity
            style={[
                ChefMenuSelectionStyles.FooterButton,
              GlobalCss.ThemeBackgroundColor,
            ]} onPress={()=>navigation.navigate('ChefOrderSummaryScreen')}>
            <Text style={ChefMenuSelectionStyles.FooterButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChefMenuSelectionScreen;
