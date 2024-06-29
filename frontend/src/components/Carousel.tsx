import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import SideSwipe from "react-native-sideswipe";

interface CarouselItem {
  imageUrl: ReturnType<typeof require>;
}

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const carouselRef = useRef<SideSwipe>(null);
  const { width: viewportWidth } = Dimensions.get("window");

  // Carousel items
  const carouselItems: CarouselItem[] = [
    {
      imageUrl: require("../../assets/dashbordImages/image2.jpg"),
    },
    {
      imageUrl: require("../../assets/dashbordImages/image5.jpg"),
    },
    {
      imageUrl: require("../../assets/dashbordImages/image3.jpg"),
    },
    {
      imageUrl: require("../../assets/dashbordImages/image4.jpg"),
    },
  ];

  const contentOffset = (viewportWidth - 400) / 2;

  // Automatically switch images every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
      carouselRef.current?.snapToNext();
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(timer);
  }, [carouselItems.length]);

  return (
    <View>
      <SideSwipe
        index={activeIndex}
        itemWidth={400}
        style={{ width: viewportWidth }}
        data={carouselItems}
        contentOffset={contentOffset}
        onIndexChange={(index) => setActiveIndex(index)}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
          <View style={styles.imageContainer}>
            <Image source={item.imageUrl} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.dotsContainer}>
        {carouselItems.map((_, index) => (
          <Entypo
            key={index}
            name="dot-single"
            size={35}
            color={index === activeIndex ? "black" : "lightgray"}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    height: 220,
    width: "100%",
    borderRadius: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Carousel;
