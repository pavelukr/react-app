import React, { useState, Fragment } from "react";
import axios from "axios";
import Header from "./Header";
import styled from "styled-components"
import ReviewForm from "./ReviewForm";
import Review from "./Review";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
    background: #fff;
    height: 100vh;
    overflow: scroll;
    
    &:last-child {
      background: #000;
    }   
`
const Main = styled.div`
  padding-left: 50px;
`

const Movie = (props) => {
    const [movie, setMovie] = useState({})
    const [review, setReview] = useState({})
    const [loaded, setLoaded] = useState(false)

    useState(()=>{
        const id = props.match.params.id
        const url = `/api/v1/movies/${id}`

        axios.get(url)
            .then(resp => {
                setMovie(resp.data)
                setLoaded(true)
            })
            .catch(resp => console.log(resp))
    }, [])

    const handleChange = (e) => {
        e.preventDefault()

        setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        const movie_id = movie.data.id
        axios.post('/api/v1/reviews', {review, movie_id})
            .then(resp => {
                setMovie(resp.data)
                setLoaded(true)
                setReview({title: '', description: '', score: 0})
            })
            .catch(resp => {})
    }

    const setRating = (score, e) => {
        e.preventDefault()

        setReview({...review, score})
    }

    let reviews
    if(loaded && movie.included) {
        reviews = movie.included.map((item, index) => {
            return (
                <Review
                    key={index}
                    attributes={item.attributes}
                />
            )
        })
    }
    return (
        <Wrapper>
            {
                loaded &&
                <Fragment>
                    <Column>
                        <Main>
                            <Header
                                attributes={movie.data.attributes}
                                reviews={movie.included}
                            />
                            {reviews}
                        </Main>
                    </Column>
                    <Column>
                      <ReviewForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setRating={setRating}
                        attributes={movie.data.attributes}
                        review={review}
                      />
                    </Column>
                </Fragment>
            }
        </Wrapper>
    )
}

export default Movie
