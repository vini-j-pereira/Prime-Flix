import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom'
import './home.css';

// https://api.themoviedb.org/3/movie/now_playing?api_key=32606ff82573d774d6649212e8016b52&language=pt-BR

function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(()=> {

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                  api_key: "32606ff82573d774d6649212e8016b52",
                  language:"pt-BR",
                  page: 1,
                }
            });
            
            setFilmes(response.data.results.slice(0, 10));   

        }

        loadFilmes();

    }, [])
    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=> {
                    return(
                        <article>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}></img>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>  
        </div>
    )
}

export default Home;