import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rating from "../Rating/Rating";

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
  text-align: center;
`
const MovieLogo = styled.div`
  width: 50px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10px;
  
  img {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    border: 1px solid #efefef;
  }
`
const MovieTitle = styled.div`
  padding: 20px 0px 10px 0px;
`
const LinkWrapper = styled.div`
  margin: 30px 0px 20px 0px;
  height: 50px;
  
  a {
    color: #fff;
    background: #000;
    border-radius: 4px;
    padding: 10px 50px;
    border 1px solid #000;
    width: 100%;
    text-decoration: none;
  }
`

const Movie = (props) => {
    return (
        <Card>
            <MovieLogo>
                <img src={props.attributes.poster_url} alt={props.attributes.title}/>
            </MovieLogo>
            <MovieTitle>{props.attributes.title}</MovieTitle>
            < Rating score={props.attributes.average_score}/>
            <LinkWrapper>
                <Link to={`/movies/${props.attributes.id}`}>View Movie</Link>
            </LinkWrapper>
        </Card>
    )
}

export default Movie
