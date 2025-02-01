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

//Footer
import FooterComponent from '../../newcomponents/Footer/FooterComponent';

const DaySelection = [
  {
    Id: 1,
    Name: 'Breakfast',
    Year: 'Jan 2025',
    Days: [
      {
        Id: 1,
        Day: 'Day 1',
        Date: '27',
      },
      {
        Id: 2,
        Day: 'Day 2',
        Date: '28',
      },
      {
        Id: 3,
        Day: 'Day 3',
        Date: '29',
      },
      {
        Id: 4,
        Day: 'Day 4',
        Date: '30',
      },
      {
        Id: 5,
        Day: 'Day 5',
        Date: '31',
      },
    ],
  },
  {
    Id: 2,
    Name: 'Lunch',
    Year: 'Jan 2025',
    Days: [
      {
        Id: 1,
        Day: 'Day 1',
        Date: '27',
      },
      {
        Id: 2,
        Day: 'Day 2',
        Date: '28',
      },
      {
        Id: 3,
        Day: 'Day 3',
        Date: '29',
      },
      {
        Id: 4,
        Day: 'Day 4',
        Date: '30',
      },
      {
        Id: 5,
        Day: 'Day 5',
        Date: '31',
      },
    ],
  },
  {
    Id: 3,
    Name: 'Dinner',
    Year: 'Jan 2025',
    Days: [
      {
        Id: 1,
        Day: 'Day 1',
        Date: '27',
      },
      {
        Id: 2,
        Day: 'Day 2',
        Date: '28',
      },
      {
        Id: 3,
        Day: 'Day 3',
        Date: '29',
      },
      {
        Id: 4,
        Day: 'Day 4',
        Date: '30',
      },
      {
        Id: 5,
        Day: 'Day 5',
        Date: '31',
      },
    ],
  },
];

const MenuSelectionData = [
  {
    Id: 1,
    Name: 'Breakfast',
    Day: [
      {
        Id: 1,
        DayName: 'Day 1',
        Date: '27',
        DayItems: [
          {
            Id: 1,
            FoodType: 'Italian',
            Items: [
              {
                Id: 1,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Idly',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 2,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Dosa',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 3,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Dal Rice',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 4,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Noodles',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 5,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Soup',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
            ],
          },
          {
            Id: 2,
            FoodType: 'Indian',
            Items: [
              {
                Id: 1,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Idly',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 2,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Dosa',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 3,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Dal Rice',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 4,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Noodles',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 5,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Soup',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
            ],
          },
          {
            Id: 3,
            FoodType: 'Japanese',
            Items: [
              {
                Id: 1,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Idly',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 2,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Dosa',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 3,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Dal Rice',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 4,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Noodles',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 5,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Soup',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
            ],
          },
          {
            Id: 4,
            FoodType: 'Korean',
            Items: [
              {
                Id: 1,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Idly',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 2,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Dosa',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 3,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Dal Rice',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 4,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Noodles',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
              {
                Id: 5,
                ItemImg: require('../../newassets/images/MenuItems/biryani.png'),
                ItemName: 'Soup',
                Rating: '4.3',
                Price: '150',
                Description:
                  'Good food is the foundation of genuine happiness.',
              },
            ],
          },
        ],
      },
    ],
  },
];

const MenuSelection = () => {
  const navigation = useNavigation();
  const [showTypeContent, setShowTypeContent] = useState(true);
  const [showSelectContent, setShowSelectContent] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [likedItems, setLikedItems] = useState({});

  const handleDaySelection = () => {
    setShowTypeContent(false);
    setShowSelectContent(true);
  };
  const handleItemSelection = () => {
    setShowTypeContent(true);
    setShowSelectContent(false);
  };
  const toggleAccordion = dayId => {
    setExpanded(prevState => ({
      ...prevState,
      [dayId]: !prevState[dayId],
    }));
  };

  const toggleLike = itemId => {
    setLikedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId], // Toggle the liked state
    }));
  };

  return (
    <View style={MenuSelectionStyles.MainPageLayout}>
      <View style={MenuSelectionStyles.PageContent}>
        <View style={MenuSelectionStyles.PageHeader}>
          <MCIcons
            name="chevron-left"
            size={40}
            color="#272727"
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <Text style={MenuSelectionStyles.PageName}>Restaurant</Text>
          <Text style={MenuSelectionStyles.RestaurantName}>
            Sairam Breakfast And Meals
          </Text>
        </View>
        {showTypeContent && (
          <View style={MenuSelectionStyles.PageMainContent}>
            <ScrollView>
              {DaySelection.map(MenuTypeItem => (
                <View key={MenuTypeItem.Id}>
                  <Card style={MenuSelectionStyles.MenuTypeCard}>
                    <View style={MenuSelectionStyles.AddDayContainer}>
                      <TouchableOpacity>
                        <Text style={MenuSelectionStyles.AddDayName}>
                          + Add Day
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={MenuSelectionStyles.MenuTypeCardBody}>
                      <Text style={MenuSelectionStyles.MenuTypeName}>
                        {MenuTypeItem.Name}
                      </Text>
                      <Text style={MenuSelectionStyles.YearName}>
                        {MenuTypeItem.Year}
                      </Text>
                      <View style={MenuSelectionStyles.DatesContainer}>
                        <FlatList
                          data={MenuTypeItem.Days}
                          keyExtractor={item => item.Id.toString()}
                          horizontal
                          renderItem={({item, index}) => (
                            <Card
                              style={[
                                MenuSelectionStyles.DayDateCard,
                                index === 0 && {marginLeft: 0}, // Conditional style for the first card
                              ]}
                              onPress={handleDaySelection}>
                              <View style={MenuSelectionStyles.DayDateCardBody}>
                                <Text style={MenuSelectionStyles.DayText}>
                                  {item.Day}
                                </Text>
                                <Text style={MenuSelectionStyles.DateText}>
                                  {item.Date}
                                </Text>
                              </View>
                            </Card>
                          )}
                          showsHorizontalScrollIndicator={false}
                        />
                      </View>
                    </View>
                  </Card>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          {showSelectContent && (
            <View style={MenuSelectionStyles.MenuSelectionContainer}>
              {MenuSelectionData.map(MenuItem => (
                <View key={MenuItem.Id}>
                  <Text style={MenuSelectionStyles.MenuName}>
                    {MenuItem.Name}
                  </Text>
                  {MenuItem.Day.map(DayAccordionItem => (
                    <View
                      key={DayAccordionItem.Id}
                      style={MenuSelectionStyles.DayAccordion}>
                      <TouchableOpacity
                        onPress={() => toggleAccordion(DayAccordionItem.Id)}
                        style={MenuSelectionStyles.DayAccordionCard}>
                        <View style={MenuSelectionStyles.DayAccordionCardBody}>
                          <Text style={MenuSelectionStyles.DayAccordionTitle}>
                            {DayAccordionItem.DayName}, {DayAccordionItem.Date}
                          </Text>
                          <MCIcons
                            name={
                              expanded[DayAccordionItem.Id]
                                ? 'chevron-down'
                                : 'chevron-right'
                            }
                            size={20}
                            color="#000"
                          />
                        </View>
                      </TouchableOpacity>
                      {expanded[DayAccordionItem.Id] &&
                        DayAccordionItem.DayItems.map(FoodType => (
                          <View
                            key={FoodType.Id}
                            style={MenuSelectionStyles.DayItem}>
                            <View
                              style={MenuSelectionStyles.FoodCategoryHeader}>
                              <Text
                                style={
                                  MenuSelectionStyles.FoodCategoryHeaderText
                                }>
                                {FoodType.FoodType}
                              </Text>
                              <TouchableOpacity
                                style={MenuSelectionStyles.ViewAllButton}>
                                <Text
                                  style={MenuSelectionStyles.ViewAllButtonText}>
                                  View All
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View style={MenuSelectionStyles.ItemContent}>
                              {FoodType.Items.map((FoodItem, index) => (
                                <>
                                  <View key={FoodItem.Id}>
                                    <Card
                                      style={MenuSelectionStyles.FoodItemCard}>
                                      <View
                                        style={
                                          MenuSelectionStyles.FoodItemCardBody
                                        }>
                                        <View
                                          style={
                                            MenuSelectionStyles.FoodImgContainer
                                          }>
                                          <Image
                                            source={FoodItem.ItemImg}
                                            style={
                                              MenuSelectionStyles.FoodItemImg
                                            }
                                          />
                                        </View>
                                        <View
                                          style={
                                            MenuSelectionStyles.FoodItemDetailsContainer
                                          }>
                                          <View
                                            style={
                                              MenuSelectionStyles.FoodItemNameLikeButton
                                            }>
                                            <Text
                                              style={
                                                MenuSelectionStyles.FoodItemName
                                              }>
                                              {FoodItem.ItemName}
                                            </Text>
                                            <TouchableOpacity
                                              style={
                                                MenuSelectionStyles.LikeButton
                                              }
                                              onPress={() =>
                                                toggleLike(FoodItem.Id)
                                              }>
                                              <MCIcons
                                                name={
                                                  likedItems[FoodItem.Id]
                                                    ? 'cards-heart'
                                                    : 'cards-heart-outline'
                                                }
                                                size={15}
                                                color="#FFB20B"
                                              />
                                            </TouchableOpacity>
                                          </View>
                                          <Text
                                            style={
                                              MenuSelectionStyles.FoodItemDescription
                                            }>
                                            {FoodItem.Description}
                                          </Text>
                                          <View
                                            style={
                                              MenuSelectionStyles.ItemPriceContent
                                            }>
                                            <FaIcons
                                              name="rupee"
                                              size={15}
                                              color="#000"
                                            />
                                            <Text
                                              style={
                                                MenuSelectionStyles.FoodItemPrice
                                              }>
                                              {FoodItem.Price}
                                            </Text>
                                          </View>
                                          <View
                                            style={
                                              MenuSelectionStyles.FoodItemTimeAddButtonContainer
                                            }>
                                            <View
                                              style={
                                                MenuSelectionStyles.WeightTimeContainer
                                              }>
                                              <View
                                                style={
                                                  MenuSelectionStyles.WeightContainer
                                                }>
                                                <FaIcons
                                                  name="shopping-bag"
                                                  size={12}
                                                  color="#FFB20B"
                                                />
                                                <Text
                                                  style={
                                                    MenuSelectionStyles.Weight
                                                  }>
                                                  250 g
                                                </Text>
                                              </View>
                                              <View
                                                style={
                                                  MenuSelectionStyles.TimeContainer
                                                }>
                                                <MCIcons
                                                  name="progress-clock"
                                                  size={13}
                                                  color="#FFB20B"
                                                />
                                                <Text
                                                  style={
                                                    MenuSelectionStyles.Time
                                                  }>
                                                  45 Min
                                                </Text>
                                              </View>
                                            </View>
                                            <TouchableOpacity
                                              style={
                                                MenuSelectionStyles.AddButtonContainer
                                              }>
                                              <MCIcons
                                                name="plus-circle-outline"
                                                size={15}
                                                color="#FFB20B"
                                              />
                                            </TouchableOpacity>
                                          </View>
                                        </View>
                                      </View>
                                    </Card>
                                  </View>
                                </>
                              ))}
                              <View
                                style={MenuSelectionStyles.SectionDivider}
                              />
                            </View>
                          </View>
                        ))}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
      <View style={MenuSelectionStyles.PageFooter}>
        {showTypeContent && <FooterComponent />}
        {showSelectContent && (
          <View style={MenuSelectionStyles.FooterButtonContainer}>
            <TouchableOpacity
              style={MenuSelectionStyles.SaveButton}
              onPress={handleItemSelection}>
              <Text style={MenuSelectionStyles.SaveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default MenuSelection;
