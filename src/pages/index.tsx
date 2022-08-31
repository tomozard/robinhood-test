import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { User } from "interfaces/user";

const Home: React.FC = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const BASE_API_URL = "https://jsonplaceholder.typicode.com/";
  const API_URL = "/users";
  const fetchApi = axios.create({
    baseURL: BASE_API_URL,
  });

  // const matchDict = (strTemp, dictionary, strArr) => {
  //   for (let i = 0; i < strTemp.length; i++) {
  //     let c = "";
  //     for (let j = 0; j <= i; j++) {
  //       c += strTemp.charAt(j);
  //       if (dictionary.includes(c)) {
  //         strArr.push(c);
  //         matchDict(strTemp.replace(c, ""), dictionary, strArr);
  //         return;
  //       }
  //     }
  //   }
  //   return strArr;
  // };

  // const checkStrWithDict = (str: string) => {
  //   const dictionary = ["apple", "fruit", "orange", "pie"];
  //   let strTemp = str;
  //   let strArr = [];
  //   matchDict(strTemp, dictionary, strArr);
  //   return strArr;
  // };
  // console.log("result", checkStrWithDict("applepie"));

  useEffect(() => {
    if (users) {
      fetchApi({
        method: "get",
        url: API_URL,
      })
        .then((res) => res.data)
        .then(
          (result) => {
            setUsers(result);
            setIsLoaded(true);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
      // const str = "applepie";
      // const dictionary = ["apple", "fruit", "orange", "pie"];
      // const res = [];
      // dictionary.forEach((dict) => {
      //   if (str.includes(dict)) {
      //     res.push(dict);
      //   }
      // });
      // console.log("result", res);
    }
  }, []);

  return (
    <Flex direction="column" minH="100vh">
      {!isLoaded && (
        <Center>
          <Spinner /> Loading...
        </Center>
      )}
      {error && (
        <Center>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error :</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        </Center>
      )}
      {users && (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Total User : {users.length}</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Address</Th>
                <Th>Website</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    {user.address.suite} {user.address.street}{" "}
                    {user.address.city}
                  </Td>
                  <Td>{user.company.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
};

export default Home;
