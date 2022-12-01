const React = require('react');
const pokemon = require('../models/pokemon');
const myStyle = {
    color: '#ffffff',
    backgroundColor: '#000000',
  };

  class Index extends React.Component {
    render () {
        const {allPokemon} = this.props
    return (
        <>
      <h1 style={myStyle}>Balls to the Walls Pokemon</h1>)
      <ul>
        {allPokemon.map((pokemon, i) => {
            return (
                <li>
                    <a href={`/pokemon/${i}`}> {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </a>
                </li>
            );
        })}
      </ul>
    
    </>
    )
    }
}

    

  module.exports = Index;