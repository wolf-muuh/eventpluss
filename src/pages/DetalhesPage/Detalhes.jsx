import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import { UserContext } from "../../context/AuthContext";
import { commentaryEventResource } from "../../Services/Service";
import api from "../../Services/Service";
import CardDetalhes from "../../components/CardDetalhes/CardDetalhes";


const Detalhes = () => {
  const [comentario, setComentario] = useState([]);
  const { state } = useLocation();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    async function DetalhesEvento() {
      try {
        const promiseComentario = await api.get(commentaryEventResource);

        setComentario(promiseComentario.data);

        console.log(promiseComentario.data);
        console.log(comentario);
      } catch (error) {}
    }
  }, []);

  return (
    <MainContent>
      {userData.role == "Administrador" ? (
        <Link to={"/eventos"}>x</Link>
      ) : (
        <Link to={"/eventos-aluno"}>x</Link>
      )}

      <section>
        <Title titleText={"Detalhes do evento"} />

        <div>
          <h1> Evento: {state.nomeEvento}</h1>

          <p>
            <strong>Data: </strong>{" "}
            {new Date(state.dataEvento).toLocaleDateString()}
          </p>
          <p>
            <strong>Sipnose do evento: </strong>
            {state.descricao}
          </p>
          <p>
            <strong>Tipo do evento: </strong>
            {state.tiposEvento.titulo}
          </p>
        </div>
        <div>
            {comentario.map((e) => {
                if (e.idEvento == state.idEvento) {
                    if (e.exibe == false && userData.role == "Comum") {
                        return;
                    } 
                    else if (e.exibe == false && userData.role == "Administrador") {
                        return (
                            <CardDetalhes />
                        );
                    }
                }
            })}
        </div>
      </section>
    </MainContent>
  );
};

export default Detalhes;
