import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineMenuAlt3, HiShoppingBag, HiUser } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  // console.log("User Info", userInfo)

  return (
    <Flex
      as="header"
      align="center"
      justifyContent="space-between"
      wrap="wrap"
      py="6"
      px="6"
      bgColor="gray.800"
      w="100%"
      top="0"
      pos="fixed"
      zIndex="20"
    >
      {/*Logo*/}
      <Heading
        as="h1"
        color="whiteAlpha.800"
        fontWeight="bold"
        size="md"
        letterSpacing="md"
      >
        <Link
          as={RouterLink}
          to="/"
          _hover={{ color: "gray.500", textDecor: "none" }}
        >
          RST Store
        </Link>
      </Heading>

      {/*Mobile Menu Icon*/}
      <Box
        onClick={() => setShow(!show)}
        display={{ base: "block", sm: "block", md: "none" }}
      >
        <Icon as={HiOutlineMenuAlt3} color="white" w="6" h="6" />
      </Box>

      {/*Menu*/}
      <Box
        display={{ base: show ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: "3", md: "0" }}
      >
        <Link
          as={RouterLink}
          to="/cart"
          fontSize="sm"
          letterSpacing="wide"
          color="whiteAlpha.600"
          fontweight="bold"
          textTransform="uppercase"
          mr="5"
          my={{ base: "2", md: 0 }}
          display="flex"
          alignItems="center"
          _hover={{ color: "whiteAlpha.800" }}
        >
          <Icon as={HiShoppingBag} mr="1" w="4" h="4" />
          Cart
        </Link>

        {userInfo ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<IoChevronDown />}
              _hover={{ textDecor: "none", opacity: "0.7" }}
            >
            {userInfo.name}
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link
            as={RouterLink}
            to="/login"
            fontSize="sm"
            letterSpacing="wide"
            color="whiteAlpha.600"
            fontWeight="bold"
            textTransform="uppercase"
            mr="5"
            my={{ base: "2", md: 0 }}
            display="flex"
            alignItems="center"
            _hover={{ color: "whiteAlpha.800" }}
          >
            <Icon as={HiUser} mr="1" w="4" h="4">
              Login
            </Icon>
          </Link>
        )}

        {/* Admin Menu */}
        {userInfo && userInfo.isAdmin && (
          <Menu>
            <MenuButton 
              ml='3'
              fontSize='sm'
              fontWeight='semibold'
              as={Button}
              textTransform='uppercase'
              _hover={{ textDecor: 'none', opacity: '0.7' }} >
              Manage
              <Icon as={IoChevronDown} />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to='/admin/userlist' >
                All Users
              </MenuItem>
              <MenuItem as={RouterLink} to='/admin/productlist' >
                All Products 
              </MenuItem>
              <MenuItem as={RouterLink} to='/admin/orderlist' >
                All Orders
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
