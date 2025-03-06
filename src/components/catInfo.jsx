import React from "react";

const CatInfo = ({catData}) => {
    return (
        <div className="catInfo">
            <h3>{catData.name}</h3>
            <p>{catData.description}</p>
            {catData.image && <img src={catData.image.url} alt={catData.name}/>}
            
            <p>Origin: {catData.origin}</p>
            <p>Temperament: {catData.temperament}</p>
            <div className="cat_stats">
                <p>Weight: {catData.weight.imperial} ibs</p>
                <p>Life Span: {catData.life_span}</p>
                <p>Affection Level: {catData.affection_level}/5 </p>
                <p>Shedding Level: {catData.shedding_level}/5 </p>
                <p>Energy Level: {catData.energy_level}/5 </p>
                <p>Health Issues: {catData.health_issues}/5 </p>
            </div>
        </div>
    );
};

export default CatInfo;