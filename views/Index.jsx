const React = require('react');

const myStyle = {
    color: 'black',
    backgroundColor: 'rgb(106, 134, 56)',
    
  };

  class Index extends React.Component {
    render () {
        const { allPokemon } = this.props
    return (
        <div>
        <link rel="stylesheet" href="/css/styles.css" type='text/css' />
      <h1 style={myStyle}>Balls to the Walls Pokemon</h1>
      <nav>
        <a href="/pokemon/New">Create a New Pokemon</a>
      </nav>
      <ul>
        {allPokemon.map((pokemon, i) => {
            return (
                <li>
                    <a href={`/pokemon/${pokemon.id}`}> {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </a>
                </li>
            );
        })}

      </ul>    
    </div>
    )
    }
}
 
  module.exports = Index;