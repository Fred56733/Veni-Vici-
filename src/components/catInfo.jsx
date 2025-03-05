import React from "react";

const CatInfo = ({catData, handleBan}) => {
    return (
        <div className="catInfo">
            <h4>{catData.name}</h4>
            <p>Origin: {catData.origin}</p>
            <p>Temperament: {catData.temperament}</p>
            <p>Life Span: {catData.life_span}</p>
            {catData.image && <img src={catData.image.url} alt={catData.name}/>}
            <button onClick={() => handleBan(catData.id)}>Ban</button>
        </div>
    );
};

export default CatInfo;