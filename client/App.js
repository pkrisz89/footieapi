import React from 'react';
import {get} from 'lodash-es';
import {getTeams, postTeam, deleteTeam} from './services/teams';
import {getGames, updateResult, addGame, deleteGame} from './services/games';
import {getUsers} from './services/users';
import {copy} from './utils';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            team: '',
            teams: [],
            games: [],
            users: [],
            newGame: {},
            loading: true,
            error: false
        }

        this.renderTeams = this
            .renderTeams
            .bind(this);
        this.addTeam = this
            .addTeam
            .bind(this);
        this.renderGames = this
            .renderGames
            .bind(this);
        this.resultSelected = this
            .resultSelected
            .bind(this);
        this.addNewGame = this
            .addNewGame
            .bind(this);
        this.renderUsers = this
            .renderUsers
            .bind(this);
        this.removeTeam = this
            .removeTeam
            .bind(this);
        this.removeGame = this
            .removeGame
            .bind(this);
    }

    componentDidMount() {
        return Promise.all([getGames(), getTeams(), getUsers()]).then(([gameData, teamData, userData]) => {
            this.setState({teams: teamData.teams, games: gameData.game, users: userData.users})
        }).catch(err => console.log(err));
    }

    renderTeams() {
        return (
            <React.Fragment>
                <p>Teams:
                </p>
                <ul>
                    {this
                        .state
                        .teams
                        .map(team => {
                            return <li key={team.teamId}>{team.name}
                                <button
                                    onClick={() => {
                                    this.removeTeam(team.teamId)
                                }}>Delete</button>
                            </li>
                        })}
                </ul>
            </React.Fragment>
        )
    }

    renderUsers() {
        return (
            <React.Fragment>
                <p>Users:
                </p>
                <ul>
                    {this
                        .state
                        .users
                        .map(user => {
                            return (
                                <li>
                                    {user.firstName}
                                    {user.lastName}
                                    - {user.score}
                                    points
                                </li>
                            )
                        })}
                </ul>
            </React.Fragment>
        )
    }

    resultSelected(e, id) {
        const gameIdx = this
            .state
            .games
            .findIndex(game => game.gameId === id);
        const gamesCopy = copy(this.state.games)
        gamesCopy[gameIdx].result = e.target.value;
        this.setState({games: gamesCopy});
    }

    renderGames() {
        return (
            <React.Fragment>
                <p>Games:
                </p>
                <ul>
                    {this
                        .state
                        .games
                        .map(game => {
                            return (
                                <li key={game.gameId}>
                                    {get(game, 'homeTeam.name')}
                                    vs {get(game, 'awayTeam.name')}
                                    at {game.startDateTime}
                                    result: {game.result}
                                    <select
                                        value={game.result}
                                        onChange={(e) => {
                                        this.resultSelected(e, game.gameId)
                                    }}>
                                        <option value="" selected disabled hidden>Choose here</option>
                                        <option value="home">Home</option>
                                        <option value="draw">Draw</option>
                                        <option value="visitor">Away</option>
                                    </select>
                                    <button onClick={() => updateResult(game.gameId, {result: game.result})}>Save</button>
                                    <button onClick={() => this.removeGame(game.gameId)}>Delete</button>
                                </li>
                            )
                        })}
                </ul>
                <p>Add game:</p>
                <label>home team
                    <select
                        onChange={(e) => {
                        const newGame = copy(this.state.newGame);
                        newGame.homeTeamId = e.target.value;
                        this.setState({newGame});
                    }}>
                        <option value="" selected disabled hidden>Choose here</option>
                        {this
                            .state
                            .teams
                            .map(team => {
                                return <option value={team.teamId}>{team.name}</option>
                            })
}
                    </select>
                </label>
                <label>away team
                    <select
                        onChange={(e) => {
                        const newGame = copy(this.state.newGame);
                        newGame.awayTeamId = e.target.value;
                        this.setState({newGame});
                    }}>
                        <option value="" selected disabled hidden>Choose here</option>
                        {this
                            .state
                            .teams
                            .map(team => {
                                return <option value={team.teamId}>{team.name}</option>
                            })
}
                    </select>
                </label>
                <input
                    type="datetime-local"
                    onChange={(e) => {
                    const newGame = copy(this.state.newGame);
                    newGame.startDateTime = e.target.value;
                    this.setState({newGame});
                }}/>
                <button onClick={this.addNewGame}>Save</button>
            </React.Fragment>
        )
    }

    removeTeam(id) {
        return deleteTeam(id)
            .then(getTeams)
            .then(({team}) => this.setState({teams: team, team: ""}))
            .catch(err => console.log(err))
    }

    removeGame(id) {
        return deleteGame(id)
            .then(getGames)
            .then(({game}) => this.setState({games: game, newGame: ""}))
            .catch(err => console.log(err))
    }

    addTeam() {
        return postTeam({name: this.state.team})
            .then(getTeams)
            .then(({team}) => this.setState({teams: team, team: ""}))
            .catch(err => console.log(err))
    }

    addNewGame() {
        const {newGame} = this.state;
        const payload = {
            homeTeamId: newGame.homeTeamId,
            awayTeamId: newGame.awayTeamId,
            startDateTime: newGame.startDateTime
        }
        return addGame(payload)
            .then(getGames)
            .then(({game}) => {
                this.setState({games: game, newGame: {}})
            })
    }

    render() {
        return (
            <div>
                {this.renderTeams()}
                <input
                    type="text"
                    value={this.state.team}
                    onChange={(e) => {
                    this.setState({team: e.target.value})
                }}/>
                <button onClick={this.addTeam}>Save team</button>
                {this.renderGames()}
                {this.renderUsers()}
            </div>
        )
    }
}

export default App;