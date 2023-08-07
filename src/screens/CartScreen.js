import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { addToCart, removeFromCart } from "../actions/cartAction";
import Message from "../components/Message";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { id: productId } = useParams();
  const qty = searchParams.get("qty");

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=/shipping`);
  }

  return (
    <Box>
      <Heading mb="8">Shopping Cart</Heading>
      <Flex>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty.</Message>
        ) : (
          <Grid templateColumns="4fr 2fr" gap="10" w="full">
            {/* Column 1 */}
            <Flex direction="column">
              {cartItems.map((item) => (
                <Grid
                  key={item.product}
                  alignItems="center"
                  justifyContent="space-between"
                  borderBottom="1px"
                  borderColor="gray.200"
                  py="4"
                  px="2"
                  rounded="lg"
                  _hover={{ bgColor: "gray.500" }}
                  templateColumns="1fr 4fr 2fr 2fr 2fr"
                >
                  {/* Product image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    borderRadius="lg"
                    height="14"
                    width="14"
                    objectFit="cover"
                  />
                  {/* Product title */}
                  <Text fontWeight='semibold' fontSize='lg' >
                    <Link as={RouterLink} to={`/product/${item.product}`} >
                        {item.name}
                    </Link>
                  </Text>
                  {/* Product price */}
                  <Text fontWeight="semibold" fontSize="lg">
                    ₹{item.price}
                  </Text>
                  {/* Quantity select box */}
                  <Select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, +e.target.value))
                    }
                    width="50%"
                  >
                    {[...Array(item.countInStock).keys()].map((i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </Select>
                  {/*Delete button */}
                  <Button
                    type="button"
                    colorScheme="red"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <Icon as={IoTrashBinSharp} />
                  </Button>
                </Grid>
              ))}
            </Flex>

            {/* Column 2 */}
            <Flex
              direction="column"
              borderWidth="2"
              borderColor="gray.200"
              rounded="md"
              padding="5"
              gap="2"
            >
              <Heading mb="3">
                Subtotal (
                {cartItems.reduce((acc, currVal) => acc + +currVal.qty, 0)}{" "}
                items)
              </Heading>
              <Text fontWeight="bold" fontSize="3xl" color="blue.600" mb="4">
                ₹
                {cartItems.reduce(
                  (acc, currVal) => acc + currVal.price * +currVal.qty,
                  0
                )}
              </Text>
              <Button
                type="button"
                isDisabled={cartItems.length === 0}
                size="lg"
                colorScheme="teal"
                bgColor="gray.800"
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </Flex>
          </Grid>
        )}
      </Flex>
    </Box>
  );
};

export default CartScreen;