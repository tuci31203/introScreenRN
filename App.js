import ava1 from './assets/ava1.png'
import ava2 from './assets/ava2.png'
import ava3 from './assets/ava3.png'
import ava4 from './assets/ava4.png'
import ava5 from './assets/ava5.png'
import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Dimensions, Image, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get("screen");


const DATA = [
  {
    id: 1,
    frame: require("./assets/frame.png"),
    screen: require("./assets/screen.png"),
    deco: null,
  },
  {
    id: 2,
    frame: require("./assets/frame.png"),
    screen: require("./assets/screen.png"),
    deco: require("./assets/deco.png")
  },
  {
    id: 3,
    frame: require("./assets/frame.png"),
    list: require("./assets/list.png"),
    decos: [ava1, ava2, ava3, ava4, ava5],
  }
];

const Indicator = ({ scrollX }) => {
  return (
    <View style={styles.indicatorContainer}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#333", "#fff", "#333"],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={[styles.indicator, { backgroundColor }]}
          />
        );
      })}
    </View>
  );
};

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scaleValues = Array(5).fill().map(() => useRef(new Animated.Value(0.8)).current);
  const scrollVal = useRef(new Animated.Value(-512)).current;

  useEffect(() => {
    const delays = [1000, 3000, 2000, 2500, 3500]
    const loopAnimation = scaleValues.map((scaleValue, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delays[index]),
          Animated.timing(scaleValue, {
            toValue: 1.3,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      )
    )

    loopAnimation.forEach(animation => animation.start());

    return () => loopAnimation.forEach(animation => animation.stop());
  }, []);
  useEffect(() => {
    const scrAni =
      Animated.loop(
        Animated.sequence([
          Animated.delay(1000),
          Animated.timing(scrollVal, {
            toValue: -700,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(scrollVal, {
            toValue: -512,
            duration: 1000,
            useNativeDriver: false,
          }),
        ])
      )

    scrAni.start();

    return () => scrAni.stop();
  }, [scrollVal]);

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width
    ];

    const top = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [-330, 100],
      extrapolate: 'clamp'
    })
    const top2 = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [-110, 137],
      extrapolate: 'clamp'
    })

    const imageSizeh = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [height * 1.7, height / 2],
      extrapolate: 'clamp'
    });
    const imageSizew = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [width + 200, width / 2],
      extrapolate: 'clamp'
    });
    const imageSizeh2 = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [height * 1.2, height / 2.4],
      extrapolate: 'clamp'
    });
    const imageSizew2 = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [width + 105, width / 2.4],
      extrapolate: 'clamp'
    });

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [0, 0, width],
      extrapolate: 'clamp'
    })
    const translateX2 = scrollX.interpolate({
      inputRange,
      outputRange: [-width, 0, 0],
      extrapolate: 'clamp'
    })

    const decos = scrollX.interpolate({
      inputRange: [(index - 0.1) * width, width * index, (index + 1) * width],
      outputRange: [width, 0, -width * 5],
      extrapolate: 'clamp'
    })
    const things = [
      { top: 340, right: 60, zIndex: 10, elevation: 10 },
      { top: 160, right: 260, zIndex: 10, elevation: 10 },
      { top: 120, right: 70, zIndex: 10, elevation: 10 },
      { top: 80, right: 190, zIndex: 0, elevation: 0 },
      { top: 360, right: 270, zIndex: 0, elevation: 0 },
    ]

    const babies = [
      { top: 360, right: 55, left: null, zIndex: 0, elevation: 0, scale: 0.5 },
      { top: 80, right: null, left: 50, zIndex: 0, elevation: 0, scale: 0.5 },
      { top: 75, right: 65, left: null, zIndex: 10, elevation: 10, scale: 0.5 },
      { top: 180, right: 55, left: null, zIndex: 10, elevation: 10, scale: 0.48 },
      { top: 248, right: null, left: 50, zIndex: 10, elevation: 10, scale: 0.5 },
    ]


    return (
      <View style={styles.pageContainer}>
        <Image
          source={require("./assets/bg.png")}
          style={{
            position: 'absolute',
            zIndex: -1,
            elevation: -1,
            width: width,
            height: height,
            opacity: 0.4
          }}
          resizeMethod='contain'
        />
        {item.deco && babies.map((one, index) => <Animated.Image
          key={index}
          source={item.deco}
          style={
            [styles.image,
            {
              top: one.top,
              right: one.right,
              left: one.left,
              zIndex: one.zIndex,
              elevation: one.elevation,
              transform: [{ scale: one.scale }, { translateX: decos }],
            }
            ]
          }
          resizeMode="contain"
        />)}
        {item.decos && scaleValues.map((scale, index) => <Animated.Image
          key={index}
          source={item.decos[index]}
          style={
            [styles.image,
            {
              top: things[index].top,
              right: things[index].right,
              zIndex: things[index].zIndex,
              elevation: things[index].elevation,
              transform: [{ scale: scale }],
            }
            ]
          }
          resizeMode="contain"
        />)}

        <Animated.Image
          source={item.frame}
          style={[
            styles.image,
            {
              width: index === 2 ? width / 2 : imageSizew,
              height: index === 2 ? height / 2 : imageSizeh,
              top: index === 2 ? 100 : top,
              transform: (index == 0 ? [{ translateX }] : index === 1 ? [{ translateX: translateX2 }] : []),
            }
          ]}
          resizeMode="contain"
        />
        {item.list && <View
          style={
            {
              position: 'absolute',
              width: width / 2.38,
              height: height / 3.2,
              backgroundColor: "red",
              zIndex: 1,
              elevation: 1,
              top: 190,
              overflow: 'hidden'
            }
          }
        >
          <Animated.Image
            source={item.list}
            style={{
              position: 'absolute',
              zIndex: 2,
              elevation: 2,
              width: '100%',
              top: scrollVal,
            }}
            resizeMode="contain"
          />
        </View>}

        <Animated.Image
          source={item.screen}
          style={[
            styles.image,
            {
              width: imageSizew2,
              height: imageSizeh2,
              zIndex: 2,
              elevation: 1,
              top: index === 2 ? 100 : top2,
              transform: (index == 0 ? [{ translateX }] : index === 1 ? [{ translateX: translateX2 }] : []),
            }
          ]}
          resizeMode="contain"
        >
        </Animated.Image>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.id}
        horizontal
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={renderItem}
      />
      <Indicator scrollX={scrollX} />
      <Pressable
        style={{
          backgroundColor: "white",
          position: "absolute",
          rounded: true,
          borderRadius: 30,
          borderWidth: 1,
          borderColor: '#ededed',
          zIndex: 1,
          bottom: 60,
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 50,
          paddingLeft: 50,
          shadowColor: 'black',
          shadowOffset: { width: 4, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        <Text
          style={{ fontSize: 20, color: '#009bde' }}
        >Đăng kí tài khoản</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 150,
    flexDirection: 'row',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 10,
  },
});