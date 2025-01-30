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
        CateName: 'Italian',
        CateCost: '2000',
      },
      {
        Id: 2,
        CateName: 'Indian',
        CateCost: '2000',
      },
      {
        Id: 3,
        CateName: 'Japanes',
        CateCost: '2000',
      },
      {
        Id: 4,
        CateName: 'Korean',
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
        CateName: 'Italian',
        CateCost: '2000',
      },
      {
        Id: 2,
        CateName: 'Indian',
        CateCost: '2000',
      },
      {
        Id: 3,
        CateName: 'Japanes',
        CateCost: '2000',
      },
      {
        Id: 4,
        CateName: 'Korean',
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
        CateName: 'Italian',
        CateCost: '2000',
      },
      {
        Id: 2,
        CateName: 'Indian',
        CateCost: '2000',
      },
      {
        Id: 3,
        CateName: 'Japanes',
        CateCost: '2000',
      },
      {
        Id: 4,
        CateName: 'Korean',
        CateCost: '2000',
      },
    ],
  },
];

const OrderSummaryScreen = () => {
  const navigation = useNavigation();
  const [activeDay, setActiveDay] = useState('Day 1');

  const handleTabPres = Day => {
    setActiveDay(Day.Name);
  };

  return (
    <View style={OrderSummaryStyles.MainPageLayout}>
      <View style={OrderSummaryStyles.PageContent}>
        <View style={OrderSummaryStyles.PageHeader}>
          <MCIcons
            name="chevron-left"
            size={40}
            color="#272727"
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <Text style={OrderSummaryStyles.PageName}>Order Summary</Text>
          <Text style={OrderSummaryStyles.YearName}>Jan 2025</Text>
        </View>
        <View style={OrderSummaryStyles.DaysContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dayList.map((DayItem, DayIndex) => (
              <TouchableOpacity
                key={DayIndex}
                style={[
                  OrderSummaryStyles.DayCard,
                  activeDay === DayItem.Name && OrderSummaryStyles.DayActiveTab,
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
                            <Card style={OrderSummaryStyles.CategoryCard}>
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
                            <Card style={OrderSummaryStyles.CategoryCard}>
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
                            <Card style={OrderSummaryStyles.CategoryCard}>
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
                            <Card style={OrderSummaryStyles.CategoryCard}>
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
                            <Card style={OrderSummaryStyles.CategoryCard}>
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
      </View>
      <View style={OrderSummaryStyles.PageFooter}>
        <View style={OrderSummaryStyles.FooterButtonContainer}>
          <TouchableOpacity style={OrderSummaryStyles.SubmitButton}>
            <Text style={OrderSummaryStyles.SubmitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderSummaryScreen;
