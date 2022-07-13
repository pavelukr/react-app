import React from "react";
import styled from "styled-components";
import Rating from '../Rating/Rating'

const Wrapper = styled.div`
  padding: 50px 100px 50px 0px;
  font-size: 30px;
  
  img {
    height: 100px;
    weight: 80px;
    border-radius: 100%;
    border: 1px solid rgba(0,0,0,0.1);
    margin-bottom: -8px;
  }
`
const TotalReviews = styled.div`
  font-size: 18px;
  padding: 10px 0px;
`
const TotalOutOf = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px 0px;
`

const Header = (props) => {
    const {length} = props.reviews;
    const {title, poster_url, average_score} = props.attributes;
    return (
        <Wrapper>
            <h1><img src={poster_url} alt={title}/> {title} </h1>
            <div>
                <TotalReviews>{length} User Reviews</TotalReviews>
                <Rating score={average_score} />
                <TotalOutOf>{average_score.toFixed(1)} out of 5 stars</TotalOutOf>
            </div>
        </Wrapper>
    )
}

export default Header