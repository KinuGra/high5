import NextLink from "next/link";
import { FC } from "react";
import { Icons } from "./icons";
import { Flex, Box, Container, Heading } from "@chakra-ui/react";

const Header: FC = () => {
  return (
    <Box px={4} bgColor="gray.100">
      <Container maxW="container.lg">
        <Flex
          as="header"
          py="4"
          justifyContent="space-between"
          alignItems="center"
        >
          <NextLink href="/">
            <Heading as="h1" fontSize="2xl" cursor="pointer">
              High5
            </Heading>
          </NextLink>

          <NextLink href="/">
            <Icons.gitHub height="32" />
          </NextLink>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
