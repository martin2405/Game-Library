import '../styles/TopBar.scss';

const TopBar = ({value, search, isNavActive, handleNav, scrollDirection}) => {
    let invisible = ''
    if (scrollDirection === 'down') invisible = 'invisible';
    else if (scrollDirection === 'up') invisible = '';


    return (
        <div className={`bar ${invisible}`} style={isNavActive ? {filter: 'blur(3px)'} : null}>
            <input type="text" value={value} onChange={search} className='bar__search' placeholder='Search...'/>
            <div className='bar__loupe'><i className="fas fa-search"></i></div>
            <button onClick={handleNav} className='bar__btn'><i className="fas fa-bars"></i></button>
        </div>
    );
}
 
export default TopBar;