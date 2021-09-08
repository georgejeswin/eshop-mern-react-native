import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
} from "react-native";
import { Left, Right, Container, H1, H2 } from "native-base";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import { hostIP } from "../../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import EasyButton from "../../Shared/StyleComponents/EasyButton";
import TrafficLight from "../../Shared/StyleComponents/TrafficLight";
import { TouchableOpacity } from "react-native-gesture-handler";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState(null);

  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    console.log(item.image);
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("Unavailable");
    } else if (props.route.params.item.countInStock == 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited Stock");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }

    return () => {
      setAvailabilityText("");
      setAvailability(null);
    };
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? `${item.image}`
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.card}>
          <View style={styles.contentContainer}>
            <H1 style={styles.contentHeader}>{item.name}</H1>
            <H2 style={styles.price}>₹{item.price}</H2>

            <Text style={styles.contentText}>{item.brand}</Text>
          </View>
          <View style={styles.availabilityContainer}>
            <View style={styles.availability}>
              <Text style={{ marginRight: 10 }}>
                Availability: {availabilityText}
              </Text>
              {availability}
            </View>
            <Text
              style={{
                width: 400,
                textAlign: "center",
              }}
            >
              {item.description}
            </Text>
            {/* <Text>{item.image}</Text> */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.addItemToCart(item),
                  Toast.show({
                    topOffset: 10,
                    type: "success",
                    text1: `${item.name} added to card`,
                    text2: "GO to your card to compleat order",
                  });
              }}
            >
              <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 17 }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 450,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    backgroundColor: "white",
  },
  price: {
    fontSize: 24,
    marginBottom: 10,
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
  card: {
    // borderTopRightRadius: 60,
    // borderTopLeftRadius: 60,
    borderRadius: 60,
    marginHorizontal: 16,
    marginTop: 40,
    flex: 1,
    padding: 20,
    backgroundColor: "gainsboro",
  },
  button: {
    borderRadius: 19,
    marginTop: 20,
    width: 300,
    height: 40,
    backgroundColor: "green",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default connect(null, mapDispatchToProps)(SingleProduct);
