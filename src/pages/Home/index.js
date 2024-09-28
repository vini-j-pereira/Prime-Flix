import { useEffect, useState } from "react";
import api from '../../services/api';

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
            
        }

        loadFilmes();

    }, [])
    return(
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home;