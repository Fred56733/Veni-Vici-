import React from "react";

const CatInfo = ({catData, handleBan}) => {
    return (
        <div className="catInfo">
            <h4>{catData.name}</h4>
            <p>{catData.description}</p>
            {catData.image && <img src={catData.image.url} alt={catData.name}/>}
            
            <p>Origin: {catData.origin}</p>
            <p>Temperament: {catData.temperament}</p>
            <p>Weight: {catData.weight.imperial} ibs</p>
            <p>Affection Level: {catData.affection_level}/5 <button onClick={() => handleBan('affection_level', catData.affection_level)}>Ban</button></p>
            <p>Shedding Level: {catData.shedding_level}/5 <button onClick={() => handleBan('shedding_level', catData.shedding_level)}>Ban</button></p>
            <p>Energy Level: {catData.energy_level}/5 <button onClick={() => handleBan('energy_level', catData.energy_level)}>Ban</button></p>
            <p>Health Issues: {catData.health_issues}/5 <button onClick={() => handleBan('health_issues', catData.health_issues)}>Ban</button></p>
            <p>Life Span: {catData.life_span}</p>


        </div>
    );
};

export default CatInfo;