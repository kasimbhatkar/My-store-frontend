import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";

import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Flex mb="5">
        <Button as={RouterLink} to="/" colorScheme="gray">
          Go Back
        </Button>
      </Flex>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid templateColumns="5fr 4fr 3fr" gap="10">
          {/* {column 1} */}
          <Image src={product.image} alt={product.name} borderRadius="md" />

          {/* column 2*/}
          <Flex direction="column">
            <Heading as="h6" fontsize="base" color="gray.500">
              {product.brand}
            </Heading>

            <Heading as="h2" fontSize="4xl" mb="4">
              {product.name}
            </Heading>

            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="yellow.500"
            />

            <Heading as="h5" my="5" fontSize="4xl" color="teal.600">
              ₹{product.price}
            </Heading>

            <Text>{product.description}</Text>
          </Flex>

          {/* column 3 */}
          <Flex direction="column">
            <Flex justifyContent="space-between" py="2">
              <Text>Price: </Text>
              <Text fontWeight="bold">₹{product.price}</Text>
            </Flex>

            <Flex justifyContent="space-between" py="2">
              <Text>Status: </Text>
              <Text fontWeight="bold">
                {product.countInStock > 0 ? "In Stock" : "Not Available"}
              </Text>
            </Flex>

            <Flex justifyContent='space-between' py='2' >
              <Text>Qty: </Text>
              <Select
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                width="30%"
              >
                {[...Array(product.countInStock).keys()].map((i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </Select>
            </Flex>

            <Button
              bg="gray.800"
              colorScheme="teal"
              my="2"
              textTransform="uppercase"
              letterSpacing="wide"
              isDisabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          </Flex>
        </Grid>
      )}
    </>
  );
};

export default ProductScreen;
