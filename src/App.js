import React, { Component } from 'react';
import Vec2 from './Vec2';
import OTetromino from './OTetromino';
import ITetromino from './ITetromino';
import TTetromino from './TTetromino';
import STetromino from './STetromino';
import ZTetromino from './ZTetromino';
import JTetromino from './JTetromino';
import LTetromino from './LTetromino';
import BottomStack from './BottomStack';
import './App.css';

const KEY = {
    LEFT:  37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40
};

class Game extends Component{
    constructor(props) {
        super(props);
        this.state = {
            screen: {
                width: window.innerWidth,
                height: window.innerHeight,
                ratio: window.devicePixelRatio || 1,
            },
            left  : false,
            right : false,
            up    : false,
            down  : false,
            context : null,
            theme : null,
            Hit : null,
            RowExplosion : null,
            score : 0,
            GameOver : false
        };
        this.currentTetromino = this.Roll();
        this.bottomStack = new BottomStack();
        this.speed = 0;
        this.score=0;
        this.GameLoop=null;
        this.GameOver=false;
        this.UpdateGame=this.UpdateGame.bind(this);
        this.returnToMenu=this.returnToMenu.bind(this);
        this.AddScoreToHighScores=this.AddScoreToHighScores.bind(this);
        this.saveScore=this.saveScore.bind(this);
    }

    Roll()
    {
        let rand=Math.floor((Math.random() * 7));

        switch (rand) {
            case 0:
                return new OTetromino(new Vec2(4, 0));
            case 1:
                return new ITetromino(new Vec2(3, 0));
            case 2:
                return new TTetromino(new Vec2(4, 0));
            case 3:
                return new STetromino(new Vec2(4, 0));
            case 4:
                return new ZTetromino(new Vec2(4, 0));
            case 5:
                return new JTetromino(new Vec2(4, 0));
            case 6:
                return new LTetromino(new Vec2(5, 0));
            default:
                return new OTetromino(new Vec2(4, 0));
        }
    }

    UpdateGame() {
        if (!this.GameOver) {
            const context = this.state.context;
            context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);

            if (this.speed >= 12) {
                this.currentTetromino.Update(new Vec2(0, 1));
                this.speed = 0;
            }
            if (this.currentTetromino.CheckCollisionToBottom() || this.bottomStack.CheckCollisionToStack(this.currentTetromino)) {
                this.currentTetromino.Update(new Vec2(0, -1));
                this.bottomStack.AddTostack(this.currentTetromino);
                if (this.bottomStack.CheckStackOverflow()) {
                    this.GameOver = true;
                    this.setState({GameOver : true});
                    this.AddScoreToHighScores()
                }
                this.currentTetromino = this.Roll();
            }
            if (this.state.right) {
                this.setState({right: false});
                this.currentTetromino.Update(new Vec2(1, 0));
                if (this.bottomStack.CheckCollisionToStack(this.currentTetromino) || this.currentTetromino.CheckCollisionToWall()) {
                    this.currentTetromino.Update(new Vec2(-1, 0));
                }
            }
            if (this.state.left) {
                this.setState({left: false});
                this.currentTetromino.Update(new Vec2(-1, 0));
                if (this.bottomStack.CheckCollisionToStack(this.currentTetromino) || this.currentTetromino.CheckCollisionToWall()) {
                    this.currentTetromino.Update(new Vec2(1, 0));
                }
            }
            if (this.state.up) {
                this.setState({up: false});
                this.currentTetromino.ChangeForm(this.bottomStack);
            }
            if (this.state.down) {
                this.setState({down: false});
                this.speed += 5;
                this.score += 1;
            }
            this.bottomStack.CheckRowFullnessAndDestroy(this);
            this.currentTetromino.Draw(context);
            this.bottomStack.Draw(context);
            this.speed++;
            this.setState({score: this.score});
            console.log("frame");
        }
    }

    handleKeys(value, e){
        if(e.keyCode === KEY.UP)
        {
            this.setState({up : true});
        }
        if(e.keyCode === KEY.LEFT)
        {
            this.setState({left : true});
        }
        else if(e.keyCode === KEY.RIGHT)
        {
            this.setState({right : true});
        }
        else if(e.keyCode === KEY.DOWN)
        {
            this.setState({down : true});
        }
    }

    returnToMenu(){
        this.props.returnToMenu();
    }

    componentDidMount()
    {
        const context = this.refs.canvas.getContext('2d');
        this.setState({ context: context });
        window.addEventListener('keydown', this.handleKeys.bind(this, false));
        this.GameLoop=setInterval(()=>this.UpdateGame(), 17);
    }

    componentWillUnmount()
    {
        clearInterval(this.GameLoop);
    }

    CheckIfHighScore(score)
    {
        for(let i=0;i<this.props.tetrisHighScores.length;i++)
        {
         if(score>Number(this.props.tetrisHighScores[i]))
            {
                return i;
            }
        }
        return -1;
    }

    AddScoreToHighScores()
    {
        let ScoreNumber = this.CheckIfHighScore(this.score);
        if(ScoreNumber > -1)
        {
            let cScores = this.props.tetrisHighScores.slice();
            cScores.push(this.score.toString());
            let comparison = function(a,b){
                return Number(b) - Number(a);
            };
            cScores.sort(comparison);
            cScores.pop();
            this.saveScore(cScores);
        }

    }

    saveScore(scores)
    {
        this.props.saveScore(scores);
    }

    render(){

        let GameOver;
        let newHighScore="";



        if(this.state.GameOver) {
            if(this.CheckIfHighScore(this.score)>-1)
            {
                switch(this.CheckIfHighScore(this.score)+1)
                {
                    case 1:
                        newHighScore=<div className="GameScore">New High Score! Top Score!</div>;
                        break;
                    case 2:
                        newHighScore=<div className="GameScore">New High Score! Second Best!</div>;
                        break;
                    case 3:
                        newHighScore=<div className="GameScore">New High Score! Third Best!</div>;
                        break;
                    default:
                        newHighScore=<div className="GameScore">New High Score! {this.CheckIfHighScore(this.score)+1}th Best!</div>;

                }
            }
            GameOver =
                <div className="HighScore">
                        Game Over
                        {newHighScore}
                        <button className="MenuButton" onClick={this.returnToMenu}>Return</button>
                </div>
        }

        return <div>
            <div>
                {this.state.score}
            </div>
            <canvas ref="canvas"
                    width={250}
                    height={500}
                    style={{
                        border: "5px solid #3f3f3f",
                        background: "#000000"
                    }}
            />
            {GameOver}
        </div>;
    }
}

class HighScore extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="HighScore">
                <div className="Score">
                    {this.props.Score}
                </div>
            </div>
        );
    }
}

class HighScores extends Component{
    constructor(props){
        super(props);
        this.returnToMenu=this.returnToMenu.bind(this);
    }

    returnToMenu(){
        this.props.returnToMenu();
    }
    render(){

        let content= this.props.tetrisHighScores.map((Score, index)=>
            <HighScore  Score={this.props.tetrisHighScores[index]}
                        index={index}
                        />
        );

        return(
            <div className="HighScores">
                {content}
                <button className="MenuButton" onClick={this.returnToMenu}>Return</button>
            </div>
        );
    }
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.states = {
            Game: "Game",
            Menu: "Menu",
            HighScores: "HighScores",
            Credits: "Credits"
        };
        this.state = {mode : this.states.Menu};
        this.startGame=this.startGame.bind(this);
        this.goToHighScores=this.goToHighScores.bind(this);
        this.returnToMenu=this.returnToMenu.bind(this);
        this.goToCredits=this.goToCredits.bind(this);
        this.saveScore=this.saveScore.bind(this);
        let scores=localStorage.getItem("tetrisHighScores");
        if(scores === null){
            scores=["0","0","0","0","0","0","0","0","0","0"];
        } else {
            scores=JSON.parse(scores);
        }
        this.tetrisHighScores = scores;
    }

    startGame(){
        this.setState({mode : this.states.Game});
    }

    goToHighScores(){
        this.setState({mode : this.states.HighScores});
    }

    goToCredits(){
        this.setState({mode : this.states.Credits});
    }

    returnToMenu(){
        this.setState({mode : this.states.Menu});
    }

    saveScore(highScores)
    {
        this.tetrisHighScores=highScores;
        localStorage.setItem("tetrisHighScores", JSON.stringify(highScores));
    }

    render() {

        let content;

        if (this.state.mode === this.states.Game) {
            content = <div className="Game-Content"> <Game returnToMenu={this.returnToMenu} saveScore={this.saveScore} tetrisHighScores={this.tetrisHighScores}/> </div>
        }

        if (this.state.mode === this.states.HighScores) {
            content = <div className="Menu-Content"><HighScores returnToMenu={this.returnToMenu} tetrisHighScores={this.tetrisHighScores} /></div>
        }

        if (this.state.mode === this.states.Credits) {
            content = <div className="Menu-Content">Tetris by Niko Suoniemi <button className="MenuButton" onClick={this.returnToMenu}>Return</button></div>
        }

        if (this.state.mode === this.states.Menu) {
            content = <div className="Menu-Content">
                <div className="Title">Tetris</div>
                <div className="Buttons">
                    <button className="MenuButton" onClick={this.startGame}>Start Game</button>
                    <button className="MenuButton" onClick={this.goToHighScores}>High Scores</button>
                    <button className="MenuButton" onClick={this.goToCredits}>Credits</button>
                </div>
            </div>
        }
        return (
            <div className="Menu">
                {content}
            </div>
        );
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <Menu/>
      </div>
    );
  }
}

export default App;
