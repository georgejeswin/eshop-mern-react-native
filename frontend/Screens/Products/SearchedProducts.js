import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Content, Left, Body, ListItem, Text } from "native-base";

var { width } = Dimensions.get("window");
import { hostIP } from "../../assets/common/baseUrl";

const SearchedProduct = (props) => {
  const { productsFiltered } = props;
  return (
    <Content style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <ListItem
            onPress={() => {
              props.navigation.navigate("Product Detail", { item: item });
            }}
            key={item._id}
            avatar
          >
            <Left>
              <Image
                source={{
                  uri: item.image,
                }}
                style={{ width: 50, height: 50, padding: 20 }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description} </Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No product match the selected criteria
          </Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SearchedProduct;
