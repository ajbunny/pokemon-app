const React = require('react');

const style = {
    body: 'rgb(106, 134, 56)'
};

class Show extends React.Component {
    
    render () {
        let pokemon = this.props.pokemon

       
        return (
        <>
         <div style={style}>
        <h1>Gotta Catch 'Em All</h1>
        <h2> {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2> 
         <img src={pokemon.img + ".jpg"}> 
        </img>
        <a href="/pokemon/"> Back</a>
        </div>
        </>
        )
       
    }
} 

module.exports = Show;