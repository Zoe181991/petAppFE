import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UsersContextInstance } from "../../contex/UsersContext";
import {
  Card,
  IconButton,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faGear, faHeart } from "@fortawesome/free-solid-svg-icons";
import CountAnimation from "./CountAnimation";
import { ArrowRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import ButtonStyled2 from "../StyledComponents/ButtonStyled2";
import MainHeader from "../StyledComponents/MainHeader";
import PrivateRouteUser from "./PrivateRouteUser";
import HomeAdmin from "../Admin/HomeAdmin";
import { AuthContextInstance } from "../../contex/AuthContext";
import DashboardCard from "../StyledComponents/DashboardCard";

function HomeLoggedIn() {
  const { loggedInUser, isLoading, setIsLoading } =
    useContext(UsersContextInstance);
  const { isAdmin } = useContext(AuthContextInstance);

  const navigate = useNavigate();

  const [countAdopted, setCountAdopted] = useState("");
  const [countUsers, setCountUsers] = useState("");
  const [countAvailable, setCountAvailable] = useState("");

  useEffect(() => {
    fetchAdopted();
    fetchAvailable();
    fetchAllUsers();
  }, []);

  const fetchAdopted = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/pets/adopted`,
        { withCredentials: true },
      );
      setCountAdopted(res.data.length);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const fetchAvailable = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/pets/available`,
        { withCredentials: true },
      );
      setCountAvailable(res.data.length);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
        withCredentials: true,
      });
      setCountUsers(res.data.length);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isAdmin ? (
        <>
          <PrivateRouteUser>
            <HomeAdmin />
          </PrivateRouteUser>
        </>
      ) : (
        <div className="main-container">
          <MainHeader
            text={`Hello ${loggedInUser?.first_name} ${loggedInUser?.last_name}`}
          />
          <Stack width={["100%", "100%", "90%"]}>
            <SimpleGrid
              className="main-font"
              minChildWidth="220px"
              spacing="10px"
            >
              <NavLink to="/mypets">
                <DashboardCard
                  isLoading={isLoading}
                  header={"My Pets"}
                  icon={faHeart}
                  description={"View a summary of all your pets."}
                  targetNumber={countAdopted}
                  boldStatement={"pets have found a new home!"}
                  buttonText={"View My Pets"}
                  buttonAction={() => navigate("/mypets")}
                />
              </NavLink>

              <NavLink to="/search">
                <DashboardCard
                  isLoading={isLoading}
                  header={"Adopt a pet!"}
                  icon={faPaw}
                  description={"Search for your perfect match"}
                  targetNumber={countAvailable}
                  boldStatement={"pets are waiting to find a new home!"}
                  buttonText={"Find your furry friend"}
                  buttonAction={() => navigate("/userprofile/edit")}
                />
              </NavLink>

              <NavLink to="./userprofile/edit">
                <DashboardCard
                  isLoading={isLoading}
                  header={"My profile"}
                  icon={faGear}
                  description={"Set your profile"}
                  targetNumber={countUsers}
                  boldStatement={"people joined Pawsitive Adoptions!"}
                  buttonText={"Edit your profile"}
                  buttonAction={() => navigate("/search")}
                />
              </NavLink>
            </SimpleGrid>
          </Stack>
        </div>
      )}
    </>
  );
}

export default HomeLoggedIn;
