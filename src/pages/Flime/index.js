import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme.info.css';
import api from '../../services/api';


function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "32606ff82573d774d6649212e8016b52",
                    language:"pt-BR",
                }
            })
            .then((response)=> {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=> {
                console.log('Filme não encontrado!');
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();



        return () => {
            console.log("Componente desmontado!")
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvos.some( (filmeSalvos) => filmeSalvos.id === filme.id)

        if(hasFilme){
            alert("Esse filme ja esta salvo na lista.")
            return;
        }

        filmeSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmeSalvos));
        alert("Filme salvo na lista com sucesso!");
    }


    if(loading){
      return(
        <div className="filme-info">
            <h1>Carregando detalhes...</h1>
        </div>
      )  
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer `}>
                        Trailer
                    </a>
                </button>

            </div>
        </div>
    )
}

export default Filme;