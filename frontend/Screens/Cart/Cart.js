import React, { useContext } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Text, Left, Right } from "native-base";

import { SwipeListView } from "react-native-swipe-list-view";

import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../Shared/StyleComponents/EasyButton";

import * as actions from "../../Redux/Actions/cartActions";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import AuthGlobal from "../../Context/store/AuthGlobal";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  const context = useContext(AuthGlobal);

  var total = 0;
  props.cartItems.forEach((cart) => {
    total += parseInt(cart.product.price);
  });

  return (
    <>
      {props.cartItems.length ? (
        <Container>
          {/* <H1 style={{ alignSelf: "center" }}>Cart</H1> */}

          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>₹{total}</Text>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={() => {
                  props.clearCart();
                }}
                style={{
                  backgroundColor: "#e34234",
                  width: 120,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginTop: 40,
                }}
              >
                <Text>Clear</Text>
              </TouchableOpacity>
            </Right>
            <Right>
              {context.stateUser.isAuthenticated ? (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Checkout");
                  }}
                  style={{
                    backgroundColor: "#32cd32",
                    width: 120,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    marginTop: 40,
                  }}
                >
                  <Text>Checkout</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("Login");
                  }}
                  style={{
                    backgroundColor: "#1e90ff",
                    width: 120,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    marginTop: 40,
                  }}
                >
                  <Text>Login</Text>
                </TouchableOpacity>
              )}
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add product to your cart to get started</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  bottomContainer: {
    flexDirection: "row",
    // position: "absolute",
    paddingBottom: 50,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
    paddingHorizontal: 15,
  },
  price: {
    fontSize: 24,
    margin: 20,
    marginTop: 50,
    fontWeight: "bold",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
