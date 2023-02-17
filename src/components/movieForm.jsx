import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
// import {  saveMovie } from '../services/fakeMovieService';
import { getMovie, saveMovie } from '../services/movieService'
class MovieForm extends Form {

    state = {
        data: {
            //  _id: '',
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().label('Number In Stock').min(0).max(100),
        dailyRentalRate: Joi.number().required().label('Daily Rental Rate').min(0).max(10)
    };



    populateGenres = async () => {
        const { data } = await getGenres()
        this.setState({ genres: data });
    }


    populateMovie = async () => {
        const { id: movieId, onNavigate } = this.props;
        if (movieId === 'new') return;
        try {
            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });

        }
        catch (ex) {
            if (ex.response && ex.response.status === 404) {
                return setTimeout(() => { onNavigate('/not-found', { replace: true }) }, 0);

            }
        }

    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    doSubmit = async () => {
        // console.log(`submitted`);
        await saveMovie(this.state.data);
        this.props.onNavigate('/', {});
        //make server call

    }


    render() {
        return (
            <React.Fragment>
                <h1>Movie Form </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', "Title")}
                    {this.renderSelect('genreId', "Genre", this.state.genres)}
                    {this.renderInput('numberInStock', "Number In Stock", "number")}
                    {this.renderInput('dailyRentalRate', "Rate")}
                    {this.renderButton("Save")}
                </form>
                {/* <button type="button" className="btn btn-primary" onClick={() => { navigate('/movies') }}>Save</button> */}
            </React.Fragment>
        );
    }
}



const withRouter = WrappedComponent => props => {
    // etc... other react-router-dom v6 hooks
    const { id } = useParams();
    const navigate = useNavigate();

    const handleNavigate = (path, options) => {
        navigate(path, options);
    }

    return (
        <WrappedComponent
            {...props}
            {...{ id, /* other injected props */ }}
            onNavigate={handleNavigate}
        />
    );
};

export default withRouter(MovieForm);

















