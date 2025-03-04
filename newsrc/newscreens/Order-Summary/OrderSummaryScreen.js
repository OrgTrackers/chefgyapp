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
import {OrderSummaryStyles} from './OrderSummary.style';
import FooterComponent from '../../newcomponents/Footer/FooterComponent';
import {Card} from 'react-native-paper';
import {GlobalCss} from '../../newassets/GlobalStyles/GlobalCss.styles';
import {MenuSelectionStyles} from '../Menu-Selection/MenuSelection.styles';

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
    MenuType: 'Salads',
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
    MenuType: 'Main Course',
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
];

const OrderSummaryScreen = () => {
  const navigation = useNavigation();
  const [activeDay, setActiveDay] = useState('Day 1');
  const [showDishes, setShowDishes] = useState({});
  const [count, setCount] = useState(0);

  const handleTabPres = Day => {
    setActiveDay(Day.Name);
  };

  const handleShowHideDishes = menuType => {
    setShowDishes(prev => ({
      ...prev,
      [menuType]: !prev[menuType], // Toggle the specific menu type (e.g., 'Salads')
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
          style={OrderSummaryStyles.HeaderContent}
          onPress={() => navigation.navigate('MenuSelection')}>
          <MCIcons name="chevron-left" size={35} color="#000" />
          <Text style={OrderSummaryStyles.PageName}>Order Summary</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={GlobalCss.MainContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={OrderSummaryStyles.YearText}>Jan 2025</Text>
        <View style={OrderSummaryStyles.DaysContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dayList.map((DayItem, DayIndex) => (
              <TouchableOpacity
                key={DayIndex}
                style={[
                  OrderSummaryStyles.DayCard,
                  activeDay === DayItem.Name && GlobalCss.ThemeBackgroundColor,
                ]}
                onPress={() => handleTabPres(DayItem)}>
                <Text
                  style={[
                    OrderSummaryStyles.DayDate,
                    activeDay === DayItem.Name &&
                      OrderSummaryStyles.DayDateActiveText,
                  ]}>
                  {DayItem.Date}
                </Text>
                <Text
                  style={[
                    OrderSummaryStyles.DayName,
                    activeDay === DayItem.Name &&
                      OrderSummaryStyles.DayNameActiveText,
                  ]}>
                  {DayItem.Name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {activeDay === 'Day 1' && (
          <View style={OrderSummaryStyles.CategoryContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {OrderSummaryList.map(CateItem => (
                <View key={CateItem.Id}>
                  <Card style={OrderSummaryStyles.CateCard}>
                    <View style={OrderSummaryStyles.CateCardBody}>
                      <Text style={OrderSummaryStyles.MenuTypeName}>
                        {CateItem.MenuType}
                      </Text>
                      <View style={OrderSummaryStyles.CateDetailsContainer}>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="progress-clock"
                            size={12}
                            color="#007873"
                          />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.Time}
                          </Text>
                        </View>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="account-multiple"
                            size={12}
                            color="#007873"
                          />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.People}
                          </Text>
                        </View>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <FaIcons name="rupee" size={12} color="#007873" />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.Cost}
                          </Text>
                        </View>
                      </View>
                      <View style={OrderSummaryStyles.CategoriesContainer}>
                        {CateItem.Category.map(CategoryItem => (
                          <View key={CategoryItem.Id}>
                            <Card
                              style={OrderSummaryStyles.CategoryCard}
                              onPress={() =>
                                handleShowHideDishes(CategoryItem.Id)
                              }>
                              <View style={OrderSummaryStyles.CategoryCardBody}>
                                <View style={OrderSummaryStyles.CategoriesDetailsContainer}>
                                  <View style={OrderSummaryStyles.CateNameIconContainer}>
                                    <Text style={OrderSummaryStyles.CategoryName}>
                                      {CategoryItem.CateName}
                                    </Text>
                                    <MCIcons
                                        name={
                                          showDishes[CategoryItem.Id]
                                            ? 'chevron-down'
                                            : 'chevron-right'
                                        }
                                        size={15}
                                        color="#000"
                                      />
                                  </View>
                                  <Text style={OrderSummaryStyles.CategoryCost}>
                                    Rs.{CategoryItem.CateCost}.00 /-
                                  </Text>
                                </View>
                                <View
                                  style={
                                    OrderSummaryStyles.DeleteButtonContainer
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
                                {DishesList.map(MenutypeItem => (
                                  <View key={MenutypeItem.Id}>
                                    <TouchableOpacity
                                      onPress={() =>
                                        handleShowHideDishes(
                                          MenutypeItem.MenuType,
                                        )
                                      }
                                      style={OrderSummaryStyles.MenuTypeButton}>
                                      <Text
                                        style={
                                          OrderSummaryStyles.MenuTypeButtonText
                                        }>
                                        {MenutypeItem.MenuType}
                                      </Text>

                                      <MCIcons
                                        name={
                                          showDishes[MenutypeItem.MenuType]
                                            ? 'chevron-down'
                                            : 'chevron-right'
                                        }
                                        size={15}
                                        color="#ffff"
                                      />
                                    </TouchableOpacity>

                                    {showDishes[MenutypeItem.MenuType] &&
                                      MenutypeItem.Items.map(DishItem => (
                                        <View key={DishItem.Id}>
                                          <Card
                                            style={
                                              OrderSummaryStyles.DishItemCard
                                            }>
                                            <View
                                              style={
                                                OrderSummaryStyles.DishItemCardbody
                                              }>
                                              <View
                                                style={
                                                  OrderSummaryStyles.DishImageContent
                                                }>
                                                <Image
                                                  source={DishItem.Image}
                                                  style={
                                                    OrderSummaryStyles.DishImage
                                                  }
                                                />
                                              </View>
                                              <View
                                                style={
                                                  OrderSummaryStyles.DishDetailsContent
                                                }>
                                                <Text
                                                  style={
                                                    OrderSummaryStyles.DishName
                                                  }>
                                                  {DishItem.Name}
                                                </Text>
                                                <Text
                                                  style={
                                                    OrderSummaryStyles.DishDescription
                                                  }
                                                  numberOfLines={3}>
                                                  {DishItem.Description}
                                                </Text>
                                              </View>
                                            </View>
                                            <View
                                              style={
                                                OrderSummaryStyles.AddRemoveButtons
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
                                                  OrderSummaryStyles.Count
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
          <View style={OrderSummaryStyles.CategoryContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {OrderSummaryList.map(CateItem => (
                <View key={CateItem.Id}>
                  <Card style={OrderSummaryStyles.CateCard}>
                    <View style={OrderSummaryStyles.CateCardBody}>
                      <Text style={OrderSummaryStyles.MenuTypeName}>
                        {CateItem.MenuType}
                      </Text>
                      <View style={OrderSummaryStyles.CateDetailsContainer}>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="progress-clock"
                            size={12}
                            color="#007873"
                          />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.Time}
                          </Text>
                        </View>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="account-multiple"
                            size={12}
                            color="#007873"
                          />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.People}
                          </Text>
                        </View>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <FaIcons name="rupee" size={12} color="#007873" />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.Cost}
                          </Text>
                        </View>
                      </View>
                      <View style={OrderSummaryStyles.CategoriesContainer}>
                        {CateItem.Category.map(CategoryItem => (
                          <View key={CategoryItem.Id}>
                            <Card
                              style={OrderSummaryStyles.CategoryCard}
                              onPress={() =>
                                handleShowHideDishes(CategoryItem.Id)
                              }>
                              <View style={OrderSummaryStyles.CategoryCardBody}>
                                <View
                                  style={
                                    OrderSummaryStyles.CategoriesDetailsContainer
                                  }>
                                  <Text style={OrderSummaryStyles.CategoryName}>
                                    {CategoryItem.CateName}
                                  </Text>
                                  <Text style={OrderSummaryStyles.CategoryCost}>
                                    Rs.{CategoryItem.CateCost}.00 /-
                                  </Text>
                                </View>
                                <View
                                  style={
                                    OrderSummaryStyles.DeleteButtonContainer
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
                                      style={OrderSummaryStyles.DishItemCard}>
                                      <View
                                        style={
                                          OrderSummaryStyles.DishItemCardbody
                                        }>
                                        <View
                                          style={
                                            OrderSummaryStyles.DishImageContent
                                          }>
                                          <Image
                                            source={DishItem.Image}
                                            style={OrderSummaryStyles.DishImage}
                                          />
                                        </View>
                                        <View
                                          style={
                                            OrderSummaryStyles.DishDetailsContent
                                          }>
                                          <Text
                                            style={OrderSummaryStyles.DishName}>
                                            {DishItem.Name}
                                          </Text>
                                          <Text
                                            style={
                                              OrderSummaryStyles.DishDescription
                                            }
                                            numberOfLines={3}>
                                            {DishItem.Description}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={
                                          OrderSummaryStyles.AddRemoveButtons
                                        }>
                                        <TouchableOpacity
                                          onPress={decreaseCount}>
                                          <MCIcons
                                            name="minus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                        <Text style={OrderSummaryStyles.Count}>
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
          <View style={OrderSummaryStyles.CategoryContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {OrderSummaryList.map(CateItem => (
                <View key={CateItem.Id}>
                  <Card style={OrderSummaryStyles.CateCard}>
                    <View style={OrderSummaryStyles.CateCardBody}>
                      <Text style={OrderSummaryStyles.MenuTypeName}>
                        {CateItem.MenuType}
                      </Text>
                      <View style={OrderSummaryStyles.CateDetailsContainer}>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="progress-clock"
                            size={12}
                            color="#007873"
                          />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.Time}
                          </Text>
                        </View>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="account-multiple"
                            size={12}
                            color="#007873"
                          />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.People}
                          </Text>
                        </View>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <FaIcons name="rupee" size={12} color="#007873" />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.Cost}
                          </Text>
                        </View>
                      </View>
                      <View style={OrderSummaryStyles.CategoriesContainer}>
                        {CateItem.Category.map(CategoryItem => (
                          <View key={CategoryItem.Id}>
                            <Card
                              style={OrderSummaryStyles.CategoryCard}
                              onPress={() =>
                                handleShowHideDishes(CategoryItem.Id)
                              }>
                              <View style={OrderSummaryStyles.CategoryCardBody}>
                                <View
                                  style={
                                    OrderSummaryStyles.CategoriesDetailsContainer
                                  }>
                                  <Text style={OrderSummaryStyles.CategoryName}>
                                    {CategoryItem.CateName}
                                  </Text>
                                  <Text style={OrderSummaryStyles.CategoryCost}>
                                    Rs.{CategoryItem.CateCost}.00 /-
                                  </Text>
                                </View>
                                <View
                                  style={
                                    OrderSummaryStyles.DeleteButtonContainer
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
                                      style={OrderSummaryStyles.DishItemCard}>
                                      <View
                                        style={
                                          OrderSummaryStyles.DishItemCardbody
                                        }>
                                        <View
                                          style={
                                            OrderSummaryStyles.DishImageContent
                                          }>
                                          <Image
                                            source={DishItem.Image}
                                            style={OrderSummaryStyles.DishImage}
                                          />
                                        </View>
                                        <View
                                          style={
                                            OrderSummaryStyles.DishDetailsContent
                                          }>
                                          <Text
                                            style={OrderSummaryStyles.DishName}>
                                            {DishItem.Name}
                                          </Text>
                                          <Text
                                            style={
                                              OrderSummaryStyles.DishDescription
                                            }
                                            numberOfLines={3}>
                                            {DishItem.Description}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={
                                          OrderSummaryStyles.AddRemoveButtons
                                        }>
                                        <TouchableOpacity
                                          onPress={decreaseCount}>
                                          <MCIcons
                                            name="minus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                        <Text style={OrderSummaryStyles.Count}>
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
          <View style={OrderSummaryStyles.CategoryContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {OrderSummaryList.map(CateItem => (
                <View key={CateItem.Id}>
                  <Card style={OrderSummaryStyles.CateCard}>
                    <View style={OrderSummaryStyles.CateCardBody}>
                      <Text style={OrderSummaryStyles.MenuTypeName}>
                        {CateItem.MenuType}
                      </Text>
                      <View style={OrderSummaryStyles.CateDetailsContainer}>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="progress-clock"
                            size={12}
                            color="#007873"
                          />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.Time}
                          </Text>
                        </View>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="account-multiple"
                            size={12}
                            color="#007873"
                          />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.People}
                          </Text>
                        </View>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <FaIcons name="rupee" size={12} color="#007873" />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.Cost}
                          </Text>
                        </View>
                      </View>
                      <View style={OrderSummaryStyles.CategoriesContainer}>
                        {CateItem.Category.map(CategoryItem => (
                          <View key={CategoryItem.Id}>
                            <Card
                              style={OrderSummaryStyles.CategoryCard}
                              onPress={() =>
                                handleShowHideDishes(CategoryItem.Id)
                              }>
                              <View style={OrderSummaryStyles.CategoryCardBody}>
                                <View
                                  style={
                                    OrderSummaryStyles.CategoriesDetailsContainer
                                  }>
                                  <Text style={OrderSummaryStyles.CategoryName}>
                                    {CategoryItem.CateName}
                                  </Text>
                                  <Text style={OrderSummaryStyles.CategoryCost}>
                                    Rs.{CategoryItem.CateCost}.00 /-
                                  </Text>
                                </View>
                                <View
                                  style={
                                    OrderSummaryStyles.DeleteButtonContainer
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
                                      style={OrderSummaryStyles.DishItemCard}>
                                      <View
                                        style={
                                          OrderSummaryStyles.DishItemCardbody
                                        }>
                                        <View
                                          style={
                                            OrderSummaryStyles.DishImageContent
                                          }>
                                          <Image
                                            source={DishItem.Image}
                                            style={OrderSummaryStyles.DishImage}
                                          />
                                        </View>
                                        <View
                                          style={
                                            OrderSummaryStyles.DishDetailsContent
                                          }>
                                          <Text
                                            style={OrderSummaryStyles.DishName}>
                                            {DishItem.Name}
                                          </Text>
                                          <Text
                                            style={
                                              OrderSummaryStyles.DishDescription
                                            }
                                            numberOfLines={3}>
                                            {DishItem.Description}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={
                                          OrderSummaryStyles.AddRemoveButtons
                                        }>
                                        <TouchableOpacity
                                          onPress={decreaseCount}>
                                          <MCIcons
                                            name="minus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                        <Text style={OrderSummaryStyles.Count}>
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
          <View style={OrderSummaryStyles.CategoryContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {OrderSummaryList.map(CateItem => (
                <View key={CateItem.Id}>
                  <Card style={OrderSummaryStyles.CateCard}>
                    <View style={OrderSummaryStyles.CateCardBody}>
                      <Text style={OrderSummaryStyles.MenuTypeName}>
                        {CateItem.MenuType}
                      </Text>
                      <View style={OrderSummaryStyles.CateDetailsContainer}>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="progress-clock"
                            size={12}
                            color="#007873"
                          />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.Time}
                          </Text>
                        </View>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <MCIcons
                            name="account-multiple"
                            size={12}
                            color="#007873"
                          />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.People}
                          </Text>
                        </View>
                        <View style={OrderSummaryStyles.CateDetailsContent}>
                          <FaIcons name="rupee" size={12} color="#007873" />
                          <Text style={OrderSummaryStyles.CateDetailsText}>
                            {CateItem.Cost}
                          </Text>
                        </View>
                      </View>
                      <View style={OrderSummaryStyles.CategoriesContainer}>
                        {CateItem.Category.map(CategoryItem => (
                          <View key={CategoryItem.Id}>
                            <Card
                              style={OrderSummaryStyles.CategoryCard}
                              onPress={() =>
                                handleShowHideDishes(CategoryItem.Id)
                              }>
                              <View style={OrderSummaryStyles.CategoryCardBody}>
                                <View
                                  style={
                                    OrderSummaryStyles.CategoriesDetailsContainer
                                  }>
                                  <Text style={OrderSummaryStyles.CategoryName}>
                                    {CategoryItem.CateName}
                                  </Text>
                                  <Text style={OrderSummaryStyles.CategoryCost}>
                                    Rs.{CategoryItem.CateCost}.00 /-
                                  </Text>
                                </View>
                                <View
                                  style={
                                    OrderSummaryStyles.DeleteButtonContainer
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
                                      style={OrderSummaryStyles.DishItemCard}>
                                      <View
                                        style={
                                          OrderSummaryStyles.DishItemCardbody
                                        }>
                                        <View
                                          style={
                                            OrderSummaryStyles.DishImageContent
                                          }>
                                          <Image
                                            source={DishItem.Image}
                                            style={OrderSummaryStyles.DishImage}
                                          />
                                        </View>
                                        <View
                                          style={
                                            OrderSummaryStyles.DishDetailsContent
                                          }>
                                          <Text
                                            style={OrderSummaryStyles.DishName}>
                                            {DishItem.Name}
                                          </Text>
                                          <Text
                                            style={
                                              OrderSummaryStyles.DishDescription
                                            }
                                            numberOfLines={3}>
                                            {DishItem.Description}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={
                                          OrderSummaryStyles.AddRemoveButtons
                                        }>
                                        <TouchableOpacity
                                          onPress={decreaseCount}>
                                          <MCIcons
                                            name="minus-circle-outline"
                                            size={15}
                                            color={GlobalCss.ThemeColor.color}
                                          />
                                        </TouchableOpacity>
                                        <Text style={OrderSummaryStyles.Count}>
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
        <View style={OrderSummaryStyles.FooterButtonContainer}>
          <TouchableOpacity
            style={[
              OrderSummaryStyles.BookCaterButton,
              GlobalCss.ThemeBackgroundColor,
            ]}
            onPress={() => navigation.navigate('FinalScreen')}>
            <Text style={OrderSummaryStyles.BookCaterText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderSummaryScreen;
