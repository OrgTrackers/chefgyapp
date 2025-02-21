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
import { HomeFoodOrderSummaryStyles } from './HomeFoodOrderSummaryScreen.styles';
import {Card} from 'react-native-paper';
import {GlobalCss} from '../../../newassets/GlobalStyles/GlobalCss.styles';

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

const OrderSummaryList = [
  {
    Id: 1,
    MenuType: 'Breakfast',
    Time: '8 am to 11 am',
    People: '2000',
    Cost: '20000',
    Category: [
      {
        Id: 1,
        CateName: 'Royal Menu',
        CateCost: '2000',
      },
      {
        Id: 2,
        CateName: 'Standard Menu',
        CateCost: '2000',
      },
      {
        Id: 3,
        CateName: 'Delux Menu',
        CateCost: '2000',
      },
    ],
  },
  {
    Id: 2,
    MenuType: 'Lunch',
    Time: '12 pm to 2 pm',
    People: '2000',
    Cost: '20000',
    Category: [
      {
        Id: 1,
        CateName: 'Royal Menu',
        CateCost: '2000',
      },
      {
        Id: 2,
        CateName: 'Standard Menu',
        CateCost: '2000',
      },
      {
        Id: 3,
        CateName: 'Delux Menu',
        CateCost: '2000',
      },
    ],
  },
  {
    Id: 3,
    MenuType: 'Dinner',
    Time: '7 pm to 10 pm',
    People: '2000',
    Cost: '20000',
    Category: [
      {
        Id: 1,
        CateName: 'Royal Menu',
        CateCost: '2000',
      },
      {
        Id: 2,
        CateName: 'Standard Menu',
        CateCost: '2000',
      },
      {
        Id: 3,
        CateName: 'Delux Menu',
        CateCost: '2000',
      },
    ],
  },
];

const DishesList = [
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
];

const HomeFoodOrderSummaryScreen = () => {
  const navigation = useNavigation();
  const [activeDay, setActiveDay] = useState('Day 1');
  const [showDishes, setShowDishes] = useState({});
  const [count, setCount] = useState(0);

  const handleTabPres = Day => {
    setActiveDay(Day.Name);
  };

  const handleShowHideDishes = id => {
    setShowDishes(prev => ({
      ...prev,
      [id]: !prev[id], // Toggle the specific category
    }));
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
        <TouchableOpacity
          style={HomeFoodOrderSummaryStyles.HeaderContent}
          onPress={() => navigation.navigate('MenuSelection')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={HomeFoodOrderSummaryStyles.PageName}>Home Food Order Summary</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={HomeFoodOrderSummaryStyles.YearText}>Jan 2025</Text>
        <View style={HomeFoodOrderSummaryStyles.DaysContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dayList.map((DayItem, DayIndex) => (
              <TouchableOpacity
                key={DayIndex}
                style={[
                  HomeFoodOrderSummaryStyles.DayCard,
                  activeDay === DayItem.Name && GlobalCss.ThemeBackgroundColor,
                ]}
                onPress={() => handleTabPres(DayItem)}>
                <Text
                  style={[
                    HomeFoodOrderSummaryStyles.DayDate,
                    activeDay === DayItem.Name &&
                      HomeFoodOrderSummaryStyles.DayDateActiveText,
                  ]}>
                  {DayItem.Date}
                </Text>
                <Text
                  style={[
                    HomeFoodOrderSummaryStyles.DayName,
                    activeDay === DayItem.Name &&
                      HomeFoodOrderSummaryStyles.DayNameActiveText,
                  ]}>
                  {DayItem.Name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {activeDay === 'Day 1' && (
          <View style={HomeFoodOrderSummaryStyles.CategoryContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {OrderSummaryList.map(CateItem => (
                <View key={CateItem.Id}>
                  <Card style={HomeFoodOrderSummaryStyles.CateCard}>
                    <View style={HomeFoodOrderSummaryStyles.CateCardBody}>
                      <Text style={HomeFoodOrderSummaryStyles.MenuTypeName}>
                        {CateItem.MenuType}
                      </Text>
                      <View style={HomeFoodOrderSummaryStyles.CateDetailsContainer}>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="progress-clock"
                            size={12}
                            color="#007873"
                          />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.Time}
                          </Text>
                        </View>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="account-multiple"
                            size={12}
                            color="#007873"
                          />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.People}
                          </Text>
                        </View>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <FaIcons name="rupee" size={12} color="#007873" />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.Cost}
                          </Text>
                        </View>
                      </View>
                      <View style={HomeFoodOrderSummaryStyles.CategoriesContainer}>
                        {CateItem.Category.map(CategoryItem => (
                          <View key={CategoryItem.Id}>
                            <Card
                              style={HomeFoodOrderSummaryStyles.CategoryCard}
                              onPress={() =>
                                handleShowHideDishes(CategoryItem.Id)
                              }>
                              <View
                                style={HomeFoodOrderSummaryStyles.CategoryCardBody}>
                                <View
                                  style={
                                    HomeFoodOrderSummaryStyles.CategoriesDetailsContainer
                                  }>
                                  <Text
                                    style={HomeFoodOrderSummaryStyles.CategoryName}>
                                    {CategoryItem.CateName}
                                  </Text>
                                  <Text
                                    style={HomeFoodOrderSummaryStyles.CategoryCost}>
                                    Rs.{CategoryItem.CateCost}.00 /-
                                  </Text>
                                </View>
                                <View
                                  style={
                                    HomeFoodOrderSummaryStyles.DeleteButtonContainer
                                  }>
                                  <MCIcons
                                    name="delete-empty"
                                    size={15}
                                    color="red"
                                  />
                                </View>
                              </View>
                            </Card>
                            {showDishes[CategoryItem.Id] && (
                              <>
                                {DishesList.map(DishItem => (
                                  <View key={DishItem.Id}>
                                    <Card
                                      style={
                                        HomeFoodOrderSummaryStyles.DishItemCard
                                      }>
                                      <View
                                        style={
                                          HomeFoodOrderSummaryStyles.DishItemCardbody
                                        }>
                                        <View
                                          style={
                                            HomeFoodOrderSummaryStyles.DishImageContent
                                          }>
                                          <Image
                                            source={DishItem.Image}
                                            style={
                                              HomeFoodOrderSummaryStyles.DishImage
                                            }
                                          />
                                        </View>
                                        <View
                                          style={
                                            HomeFoodOrderSummaryStyles.DishDetailsContent
                                          }>
                                          <Text
                                            style={
                                              HomeFoodOrderSummaryStyles.DishName
                                            }>
                                            {DishItem.Name}
                                          </Text>
                                          <Text
                                            style={
                                              HomeFoodOrderSummaryStyles.DishDescription
                                            }
                                            numberOfLines={3}>
                                            {DishItem.Description}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={
                                          HomeFoodOrderSummaryStyles.AddRemoveButtons
                                        }>
                                        <TouchableOpacity
                                          onPress={decreaseCount}>
                                          <MCIcons
                                            name="minus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                        <Text
                                          style={HomeFoodOrderSummaryStyles.Count}>
                                          {count}
                                        </Text>
                                        <TouchableOpacity
                                          onPress={increaseCount}>
                                          <MCIcons
                                            name="plus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    </Card>
                                  </View>
                                ))}
                              </>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {activeDay === 'Day 2' && (
          <View style={HomeFoodOrderSummaryStyles.CategoryContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {OrderSummaryList.map(CateItem => (
                <View key={CateItem.Id}>
                  <Card style={HomeFoodOrderSummaryStyles.CateCard}>
                    <View style={HomeFoodOrderSummaryStyles.CateCardBody}>
                      <Text style={HomeFoodOrderSummaryStyles.MenuTypeName}>
                        {CateItem.MenuType}
                      </Text>
                      <View style={HomeFoodOrderSummaryStyles.CateDetailsContainer}>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="progress-clock"
                            size={12}
                            color="#007873"
                          />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.Time}
                          </Text>
                        </View>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="account-multiple"
                            size={12}
                            color="#007873"
                          />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.People}
                          </Text>
                        </View>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <FaIcons name="rupee" size={12} color="#007873" />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.Cost}
                          </Text>
                        </View>
                      </View>
                      <View style={HomeFoodOrderSummaryStyles.CategoriesContainer}>
                        {CateItem.Category.map(CategoryItem => (
                          <View key={CategoryItem.Id}>
                            <Card
                              style={HomeFoodOrderSummaryStyles.CategoryCard}
                              onPress={() =>
                                handleShowHideDishes(CategoryItem.Id)
                              }>
                              <View
                                style={HomeFoodOrderSummaryStyles.CategoryCardBody}>
                                <View
                                  style={
                                    HomeFoodOrderSummaryStyles.CategoriesDetailsContainer
                                  }>
                                  <Text
                                    style={HomeFoodOrderSummaryStyles.CategoryName}>
                                    {CategoryItem.CateName}
                                  </Text>
                                  <Text
                                    style={HomeFoodOrderSummaryStyles.CategoryCost}>
                                    Rs.{CategoryItem.CateCost}.00 /-
                                  </Text>
                                </View>
                                <View
                                  style={
                                    HomeFoodOrderSummaryStyles.DeleteButtonContainer
                                  }>
                                  <MCIcons
                                    name="delete-empty"
                                    size={15}
                                    color="red"
                                  />
                                </View>
                              </View>
                            </Card>
                            {showDishes[CategoryItem.Id] && (
                              <>
                                {DishesList.map(DishItem => (
                                  <View key={DishItem.Id}>
                                    <Card
                                      style={
                                        HomeFoodOrderSummaryStyles.DishItemCard
                                      }>
                                      <View
                                        style={
                                          HomeFoodOrderSummaryStyles.DishItemCardbody
                                        }>
                                        <View
                                          style={
                                            HomeFoodOrderSummaryStyles.DishImageContent
                                          }>
                                          <Image
                                            source={DishItem.Image}
                                            style={
                                              HomeFoodOrderSummaryStyles.DishImage
                                            }
                                          />
                                        </View>
                                        <View
                                          style={
                                            HomeFoodOrderSummaryStyles.DishDetailsContent
                                          }>
                                          <Text
                                            style={
                                              HomeFoodOrderSummaryStyles.DishName
                                            }>
                                            {DishItem.Name}
                                          </Text>
                                          <Text
                                            style={
                                              HomeFoodOrderSummaryStyles.DishDescription
                                            }
                                            numberOfLines={3}>
                                            {DishItem.Description}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={
                                          HomeFoodOrderSummaryStyles.AddRemoveButtons
                                        }>
                                        <TouchableOpacity
                                          onPress={decreaseCount}>
                                          <MCIcons
                                            name="minus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                        <Text
                                          style={HomeFoodOrderSummaryStyles.Count}>
                                          {count}
                                        </Text>
                                        <TouchableOpacity
                                          onPress={increaseCount}>
                                          <MCIcons
                                            name="plus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    </Card>
                                  </View>
                                ))}
                              </>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {activeDay === 'Day 3' && (
          <View style={HomeFoodOrderSummaryStyles.CategoryContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {OrderSummaryList.map(CateItem => (
                <View key={CateItem.Id}>
                  <Card style={HomeFoodOrderSummaryStyles.CateCard}>
                    <View style={HomeFoodOrderSummaryStyles.CateCardBody}>
                      <Text style={HomeFoodOrderSummaryStyles.MenuTypeName}>
                        {CateItem.MenuType}
                      </Text>
                      <View style={HomeFoodOrderSummaryStyles.CateDetailsContainer}>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="progress-clock"
                            size={12}
                            color="#007873"
                          />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.Time}
                          </Text>
                        </View>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="account-multiple"
                            size={12}
                            color="#007873"
                          />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.People}
                          </Text>
                        </View>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <FaIcons name="rupee" size={12} color="#007873" />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.Cost}
                          </Text>
                        </View>
                      </View>
                      <View style={HomeFoodOrderSummaryStyles.CategoriesContainer}>
                        {CateItem.Category.map(CategoryItem => (
                          <View key={CategoryItem.Id}>
                            <Card
                              style={HomeFoodOrderSummaryStyles.CategoryCard}
                              onPress={() =>
                                handleShowHideDishes(CategoryItem.Id)
                              }>
                              <View
                                style={HomeFoodOrderSummaryStyles.CategoryCardBody}>
                                <View
                                  style={
                                    HomeFoodOrderSummaryStyles.CategoriesDetailsContainer
                                  }>
                                  <Text
                                    style={HomeFoodOrderSummaryStyles.CategoryName}>
                                    {CategoryItem.CateName}
                                  </Text>
                                  <Text
                                    style={HomeFoodOrderSummaryStyles.CategoryCost}>
                                    Rs.{CategoryItem.CateCost}.00 /-
                                  </Text>
                                </View>
                                <View
                                  style={
                                    HomeFoodOrderSummaryStyles.DeleteButtonContainer
                                  }>
                                  <MCIcons
                                    name="delete-empty"
                                    size={15}
                                    color="red"
                                  />
                                </View>
                              </View>
                            </Card>
                            {showDishes[CategoryItem.Id] && (
                              <>
                                {DishesList.map(DishItem => (
                                  <View key={DishItem.Id}>
                                    <Card
                                      style={
                                        HomeFoodOrderSummaryStyles.DishItemCard
                                      }>
                                      <View
                                        style={
                                          HomeFoodOrderSummaryStyles.DishItemCardbody
                                        }>
                                        <View
                                          style={
                                            HomeFoodOrderSummaryStyles.DishImageContent
                                          }>
                                          <Image
                                            source={DishItem.Image}
                                            style={
                                              HomeFoodOrderSummaryStyles.DishImage
                                            }
                                          />
                                        </View>
                                        <View
                                          style={
                                            HomeFoodOrderSummaryStyles.DishDetailsContent
                                          }>
                                          <Text
                                            style={
                                              HomeFoodOrderSummaryStyles.DishName
                                            }>
                                            {DishItem.Name}
                                          </Text>
                                          <Text
                                            style={
                                              HomeFoodOrderSummaryStyles.DishDescription
                                            }
                                            numberOfLines={3}>
                                            {DishItem.Description}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={
                                          HomeFoodOrderSummaryStyles.AddRemoveButtons
                                        }>
                                        <TouchableOpacity
                                          onPress={decreaseCount}>
                                          <MCIcons
                                            name="minus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                        <Text
                                          style={HomeFoodOrderSummaryStyles.Count}>
                                          {count}
                                        </Text>
                                        <TouchableOpacity
                                          onPress={increaseCount}>
                                          <MCIcons
                                            name="plus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    </Card>
                                  </View>
                                ))}
                              </>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {activeDay === 'Day 4' && (
          <View style={HomeFoodOrderSummaryStyles.CategoryContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {OrderSummaryList.map(CateItem => (
                <View key={CateItem.Id}>
                  <Card style={HomeFoodOrderSummaryStyles.CateCard}>
                    <View style={HomeFoodOrderSummaryStyles.CateCardBody}>
                      <Text style={HomeFoodOrderSummaryStyles.MenuTypeName}>
                        {CateItem.MenuType}
                      </Text>
                      <View style={HomeFoodOrderSummaryStyles.CateDetailsContainer}>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="progress-clock"
                            size={12}
                            color="#007873"
                          />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.Time}
                          </Text>
                        </View>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="account-multiple"
                            size={12}
                            color="#007873"
                          />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.People}
                          </Text>
                        </View>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <FaIcons name="rupee" size={12} color="#007873" />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.Cost}
                          </Text>
                        </View>
                      </View>
                      <View style={HomeFoodOrderSummaryStyles.CategoriesContainer}>
                        {CateItem.Category.map(CategoryItem => (
                          <View key={CategoryItem.Id}>
                            <Card
                              style={HomeFoodOrderSummaryStyles.CategoryCard}
                              onPress={() =>
                                handleShowHideDishes(CategoryItem.Id)
                              }>
                              <View
                                style={HomeFoodOrderSummaryStyles.CategoryCardBody}>
                                <View
                                  style={
                                    HomeFoodOrderSummaryStyles.CategoriesDetailsContainer
                                  }>
                                  <Text
                                    style={HomeFoodOrderSummaryStyles.CategoryName}>
                                    {CategoryItem.CateName}
                                  </Text>
                                  <Text
                                    style={HomeFoodOrderSummaryStyles.CategoryCost}>
                                    Rs.{CategoryItem.CateCost}.00 /-
                                  </Text>
                                </View>
                                <View
                                  style={
                                    HomeFoodOrderSummaryStyles.DeleteButtonContainer
                                  }>
                                  <MCIcons
                                    name="delete-empty"
                                    size={15}
                                    color="red"
                                  />
                                </View>
                              </View>
                            </Card>
                            {showDishes[CategoryItem.Id] && (
                              <>
                                {DishesList.map(DishItem => (
                                  <View key={DishItem.Id}>
                                    <Card
                                      style={
                                        HomeFoodOrderSummaryStyles.DishItemCard
                                      }>
                                      <View
                                        style={
                                          HomeFoodOrderSummaryStyles.DishItemCardbody
                                        }>
                                        <View
                                          style={
                                            HomeFoodOrderSummaryStyles.DishImageContent
                                          }>
                                          <Image
                                            source={DishItem.Image}
                                            style={
                                              HomeFoodOrderSummaryStyles.DishImage
                                            }
                                          />
                                        </View>
                                        <View
                                          style={
                                            HomeFoodOrderSummaryStyles.DishDetailsContent
                                          }>
                                          <Text
                                            style={
                                              HomeFoodOrderSummaryStyles.DishName
                                            }>
                                            {DishItem.Name}
                                          </Text>
                                          <Text
                                            style={
                                              HomeFoodOrderSummaryStyles.DishDescription
                                            }
                                            numberOfLines={3}>
                                            {DishItem.Description}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={
                                          HomeFoodOrderSummaryStyles.AddRemoveButtons
                                        }>
                                        <TouchableOpacity
                                          onPress={decreaseCount}>
                                          <MCIcons
                                            name="minus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                        <Text
                                          style={HomeFoodOrderSummaryStyles.Count}>
                                          {count}
                                        </Text>
                                        <TouchableOpacity
                                          onPress={increaseCount}>
                                          <MCIcons
                                            name="plus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    </Card>
                                  </View>
                                ))}
                              </>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {activeDay === 'Day 5' && (
          <View style={HomeFoodOrderSummaryStyles.CategoryContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {OrderSummaryList.map(CateItem => (
                <View key={CateItem.Id}>
                  <Card style={HomeFoodOrderSummaryStyles.CateCard}>
                    <View style={HomeFoodOrderSummaryStyles.CateCardBody}>
                      <Text style={HomeFoodOrderSummaryStyles.MenuTypeName}>
                        {CateItem.MenuType}
                      </Text>
                      <View style={HomeFoodOrderSummaryStyles.CateDetailsContainer}>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="progress-clock"
                            size={12}
                            color="#007873"
                          />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.Time}
                          </Text>
                        </View>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="account-multiple"
                            size={12}
                            color="#007873"
                          />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.People}
                          </Text>
                        </View>
                        <View style={HomeFoodOrderSummaryStyles.CateDetailsContent}>
                          <FaIcons name="rupee" size={12} color="#007873" />
                          <Text style={HomeFoodOrderSummaryStyles.CateDetailsText}>
                            {CateItem.Cost}
                          </Text>
                        </View>
                      </View>
                      <View style={HomeFoodOrderSummaryStyles.CategoriesContainer}>
                        {CateItem.Category.map(CategoryItem => (
                          <View key={CategoryItem.Id}>
                            <Card
                              style={HomeFoodOrderSummaryStyles.CategoryCard}
                              onPress={() =>
                                handleShowHideDishes(CategoryItem.Id)
                              }>
                              <View
                                style={HomeFoodOrderSummaryStyles.CategoryCardBody}>
                                <View
                                  style={
                                    HomeFoodOrderSummaryStyles.CategoriesDetailsContainer
                                  }>
                                  <Text
                                    style={HomeFoodOrderSummaryStyles.CategoryName}>
                                    {CategoryItem.CateName}
                                  </Text>
                                  <Text
                                    style={HomeFoodOrderSummaryStyles.CategoryCost}>
                                    Rs.{CategoryItem.CateCost}.00 /-
                                  </Text>
                                </View>
                                <View
                                  style={
                                    HomeFoodOrderSummaryStyles.DeleteButtonContainer
                                  }>
                                  <MCIcons
                                    name="delete-empty"
                                    size={15}
                                    color="red"
                                  />
                                </View>
                              </View>
                            </Card>
                            {showDishes[CategoryItem.Id] && (
                              <>
                                {DishesList.map(DishItem => (
                                  <View key={DishItem.Id}>
                                    <Card
                                      style={
                                        HomeFoodOrderSummaryStyles.DishItemCard
                                      }>
                                      <View
                                        style={
                                          HomeFoodOrderSummaryStyles.DishItemCardbody
                                        }>
                                        <View
                                          style={
                                            HomeFoodOrderSummaryStyles.DishImageContent
                                          }>
                                          <Image
                                            source={DishItem.Image}
                                            style={
                                              HomeFoodOrderSummaryStyles.DishImage
                                            }
                                          />
                                        </View>
                                        <View
                                          style={
                                            HomeFoodOrderSummaryStyles.DishDetailsContent
                                          }>
                                          <Text
                                            style={
                                              HomeFoodOrderSummaryStyles.DishName
                                            }>
                                            {DishItem.Name}
                                          </Text>
                                          <Text
                                            style={
                                              HomeFoodOrderSummaryStyles.DishDescription
                                            }
                                            numberOfLines={3}>
                                            {DishItem.Description}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={
                                          HomeFoodOrderSummaryStyles.AddRemoveButtons
                                        }>
                                        <TouchableOpacity
                                          onPress={decreaseCount}>
                                          <MCIcons
                                            name="minus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                        <Text
                                          style={HomeFoodOrderSummaryStyles.Count}>
                                          {count}
                                        </Text>
                                        <TouchableOpacity
                                          onPress={increaseCount}>
                                          <MCIcons
                                            name="plus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                      </View>
                                    </Card>
                                  </View>
                                ))}
                              </>
                            )}
                          </View>
                        ))}
                      </View>
                    </View>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
      <View style={GlobalCss.FooterContainer}>
        <View style={HomeFoodOrderSummaryStyles.FooterButtonContainer}>
          <TouchableOpacity
            style={[
              HomeFoodOrderSummaryStyles.BookCaterButton,
              GlobalCss.ThemeBackgroundColor,
            ]}
            onPress={() => navigation.navigate('FinalScreen')}>
            <Text style={HomeFoodOrderSummaryStyles.BookCaterText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeFoodOrderSummaryScreen;
