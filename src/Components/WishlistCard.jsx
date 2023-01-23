import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../Redux/Cart/Cart.action";

const WishlistCard = ({ prod }) => {

  //console.log(prod);
  const { id,brand, discount, discounted_price, images, strike_price } = prod;
 const dispatch=useDispatch();
  const addToBag = async () => {
    // console.log("newItem:",props)
    await axios
      .post(`https://classic-world.onrender.com/cart/`, prod)
      .then((res) => {
        alert("Added to bag Successfully....");
        dispatch(fetchCartData()) 
      })
      .catch((err) => alert("Already Exists in Your Bag"));
  };

  
  
  const removeFromWishlist= async(id)=>{
      console.log(id)
 
      await axios.delete(`https://classic-world.onrender.com/wishlist/${id}`)
      .then((res)=>{
        window.location.reload(); 
        alert("Items has been removed...")
    })
      .catch((err)=>console.log(err))
 
  }
 

  return (
    
    <Box w={"230px"} boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"} m={"1rem"} position="relative">
      <Stack spacing={"0.5rem"}>
        tilte
        <Image src={images} />
        <Text>{brand}</Text>
        <Flex
          justifyContent={"space-between"}
          alignItems={"baseline"}
          p={"0 1.5rem"}
          gap={"0.5rem"}
        >
          <Text fontSize={"0.9rem"}> Rs.{discounted_price}</Text>
          <Text
            fontSize={"0.7rem"}
            textDecoration={"line-through"}
            color={"gray.400"}
          >
            Rs.{strike_price}
          </Text>
          <Text fontWeight={"700"} fontSize={"0.7rem"} color={"red.400"}>
            {discount}
          </Text>
        </Flex>
        <Box p={"0.5rem"}>
          <Button
            onClick={() => addToBag()}
            _hover={{
              backgroundColor: "white",
              color: "pink.500",
              outlineColor: "pink.500",
            }}
            borderRadius={"0.2rem"}
            w={"70%"}
            m={"auto"}
            color={"#fff"}
            backgroundColor={"pink.500"}
            fontSize={"1.2rem"}
            fontWeight={700}
          >
            Add To Bag
          </Button>
        </Box>
      </Stack>
      <Box
        position={"absolute"}
        top={0}
        right={"1rem"}
        color={"white"}
        backgroundColor={"blackAlpha.600"}
        p={"0.5rem"}
        onClick={()=>removeFromWishlist(id)}
      >
        <CloseIcon />
      </Box>
    </Box>
  );
};

export default WishlistCard;
