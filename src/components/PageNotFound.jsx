import React from "react";
import { Image } from "@chakra-ui/react";
import fallBackSrc from "../images/dog.jpg";
import { NavLink, useNavigate } from "react-router-dom";

function PageNotFound(props) {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <NavLink to="/search">
        <Image
          className="home-welcome-dog-pic"
          fallbackSrc={fallBackSrc}
          borderRadius="full"
          boxSize="250px"
          src={
            "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjl5b253OGgwOHAxb2d2N2Y4OXF6bGc1b3hvbnd6dDd5cjV0cHVsbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EX6wKXVM9IOlO/giphy.gif"
          }
          mr="16"
          alt="dog-img"
        />
      </NavLink>
      <div className="inner-box">
        <h1 className="main-header"> Oops! page not found</h1>
        <div className="typewriter sub-header">
          <div className="container-fluid">
            <div className="search-button" onClick={() => navigate("/")}>
              <h3>
                BACK TO HOME PAGE <span>❯</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
