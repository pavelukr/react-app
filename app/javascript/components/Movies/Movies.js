import React, {useState, useEffect, Fragment} from "react";
import axios from "axios"
import Movie from "./Movie";
import styled from "styled-components";
import NewMovieIcon from '/app/assets/images/new-help-section.svg';
import Modal from 'react-modal';
import NewMovieModal from '../Movie/NewMovie'

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`
const Header = styled.div`
  padding: 100px 10px 100px 10px;
  
  h1{
    font-size: 42px;
  }
`
const Subheader = styled.div`
  font-weight: 300;
  font-size: 26px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;
`

const Card = styled.div`
  border: 1px solid #efefef;
  background: #fff;
  text-align: center;
  padding-top: 20%;
`

const Movies = () => {
    const [movies, setMovies] = useState([])
    const [openNewMovieModal, setNewMovieModal] = useState(false)
    const [movie, setNewMovie] = useState({})

    const toggleModal = () => {
        setNewMovieModal(!openNewMovieModal);
    }

    const handleChange = (e) => {
        e.preventDefault()

        setNewMovie(Object.assign({}, movie, {[e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post('/api/v1/movies', { movie })
            .then(resp => {
                setMovies(resp.data.data);
                toggleModal();
            })
            .catch(resp => {})
    }

    const getMovies = () => {
        axios.get('/api/v1/movies.json')
            .then(resp => setMovies(resp.data.data))
            .catch(resp => console.log(resp))
    }

    useEffect(() => {
        getMovies();
    }, [movies.length])

    const grid = movies.map(item => {
        return (
            <Movie
                key={item.attributes.title}
                attributes={item.attributes}
            />
        )
    })

    const newMovieCard = () => {
        return (
            <Card>
                <img
                    src={NewMovieIcon} alt="New Section"
                    onClick={(e) => setNewMovieModal(true)
                }/>
                <h3 className="knowledge-base__new-card-title">
                    Add New Movie
                </h3>
            </Card>
        )
    }

    return (
      <Home>
        <Header>
            <h1>ExtraMovies</h1>
            <Subheader>Honest, unbiased movies reviews.</Subheader>
        </Header>
        <Grid>
            {grid}
            {newMovieCard()}
        </Grid>
          <NewMovieModal
              modalFlag={openNewMovieModal}
              toggleModal={toggleModal}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              movie={movie}
          />
      </Home>
    )
}

export default Movies
