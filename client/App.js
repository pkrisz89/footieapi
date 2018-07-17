import React from 'react';
import {getTeams, postTeam} from './services/teams';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            team: '',
            teams: [],
            loading: true,
            error: false
        }

        this.renderTeams = this.renderTeams.bind(this);
        this.addTeam = this.addTeam.bind(this);
    }

    componentDidMount(){
        return getTeams()
            .then(({teams}) => this.setState({teams}))
            .catch(err => console.log(err));
    }

    renderTeams(){
        return (
            <React.Fragment>
                Teams:
                <ul>
                    {this.state.teams.map(team => {
                        return <li key={team.id}>{team.name}</li>
                    })}
                </ul>
            </React.Fragment>
        )
    }

    addTeam(){
        return postTeam({name: this.state.team})
            .then(getTeams)
            .then(({teams}) => this.setState({ teams, team: ""}))
            .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                {this.renderTeams()}
                <input type="text" 
                    value={this.state.team} 
                    onChange={(e)=>{this.setState({team: e.target.value})}}/>
                <button onClick={this.addTeam}>Submit</button>
            </div>
        )
    }
}

export default App;