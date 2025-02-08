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
import {MenuSelectionStyles} from './MenuSelection.styles';
import {GlobalCss} from '../../newassets/GlobalStyles/GlobalCss.styles';

//Footer
import FooterComponent from '../../newcomponents/Footer/FooterComponent';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

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
            ItemCategoryName: 'Japanese',
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
            ItemCategoryName: 'Korean',
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
        Category: 'Lunch',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
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
        Id: 3,
        Category: 'Dinner',
        ItemCategory: [
          {
            Id: 1,
            ItemCategoryName: 'Indian',
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
  // {
  //   Id: 2,
  //   MenuName: 'Standard Menu',
  //   CategoryTypes: [
  //     {
  //       Id: 1,
  //       Category: 'Breakfast',
  //       ItemCategory: [
  //         {
  //           Id: 1,
  //           ItemCategoryName: 'Indian',
  //           Items: [
  //             {
  //               Id: 1,
  //               Name: 'Biryani',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

const MenuSelection = () => {
  const [activeDay, setActiveDay] = useState('Day 1');
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItemCategory, setSelectedItemCategory] = useState(null);
  const [count, setCount] = useState(0);

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
        <TouchableOpacity style={MenuSelectionStyles.HeaderContent}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          {/* <Text style={MenuSelectionStyles.PageName}>Menu Selection</Text> */}
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
                    {menu.MenuName}
                  </Text>
                  <View style={MenuSelectionStyles.Details_Content}>
                    <Text style={MenuSelectionStyles.Label}>Price :</Text>
                    <Text style={MenuSelectionStyles.Details_Text}>
                      Rs.2000 /-
                    </Text>
                  </View>
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
                                {selectedItemCategory === itemCategory.Id && (
                                  <View
                                    style={MenuSelectionStyles.subContainer}>
                                    {itemCategory.Items.map(DishItem => (
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
                                              style={MenuSelectionStyles.Count}>
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
        <FooterComponent />
      </View>
    </View>
  );
};

export default MenuSelection;
