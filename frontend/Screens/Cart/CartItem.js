import React, { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";
import { hostIP } from "../../assets/common/baseUrl";

const CartItem = (props) => {
  const data = props.item.item.product;
  const [quantity, setQuantity] = useState(props.item.item.quantity);
  useEffect(() => {
    console.log(data.image);
  }, []);

  return (
    <ListItem style={styles.listItem} key={Math.random()} avatar>
      <Left>
        <Image
          style={styles.image}
          source={{
            uri: data.image
              ? data.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Text>{data.name} </Text>
        <Right>
          <Text>₹{data.price}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 70,
    // padding: 10,
    height: 70,
  },
});
export default CartItem;
