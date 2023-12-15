import React from 'react';

const CardDetalhes = ({ titulo, nomeUsuario, comentario, exibe = ""}) => {
    return (
        <article>
                <h2>{titulo}</h2>
                <p>{nomeUsuario}</p>
                <p>{comentario}</p>

                <span>{exibe}</span>
        </article>
    );
};

export default CardDetalhes;