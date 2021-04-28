import GameMiniature from '../components/GameMiniature';

const Category = ({games, showOptions, props}) => {
    games.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0
    })

    let classifyGames = games
    const category = props.match.params.category

    if (category) classifyGames = games.filter(game => game[category])

    const list = classifyGames.map(game => <GameMiniature key={game.id} img={game.background_image} name={game.name} showOptions={showOptions} game={game}/>)

    return (
        <>
        {list}
        </>
    );
}
 
export default Category;