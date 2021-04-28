const GameMiniature = ({img, name, showOptions, game}) => {
    return (
        <div className='game' onClick={() => showOptions('open', game)}>
            <div className='game__img' style={{backgroundImage: `url(${img})`}}></div>
            <p className='game__title'>{name}</p>
        </div>
    );
}
 
export default GameMiniature;