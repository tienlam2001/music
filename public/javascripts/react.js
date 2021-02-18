
const e = React.createElement;
var bar = document.getElementById("container")
var socket = io()


function Text(props){
	return(
		<p id = {props.id}>
			Nguoi la : {props.message}
		</p>
	)
}
class App extends React.Component {
  	constructor(props){
  		super(props)
    		this.state={
					message: [],
					length: 0
    		}

    		this.onSubmit = this.onSubmit.bind(this)
 	}



	  componentDidMount(){

		document.addEventListener('keydown', event=>{
      			if(event.keyCode == 13 && document.getElementById('chat').value != ""){
        			this.onSubmit();
      			}

   	 	});
		socket.on("chat message", msg=>{

				fetch("/json")
				.then(req=>req.json())
				.then(res=>
					this.setState(state=>({
						message: res.message
					}))
				)

			})









	}
	componentWillMount(){

		fetch("/json")
			.then(req=>req.json())
			.then(res=>
				this.setState(state=>({
					message: res.message
				}))
			)

	}
  	onSubmit(){
		var input = document.getElementById("chat").value
		socket.emit("chat message", input)
		// fetch("http://localhost:4000/json")
		// .then(req=>req.json())
		// .then(res=>
		// 	this.setState(state=>({
		// 		message: res.message
		// 	}))
		//)

		document.getElementById("chat").value = ""


 	}

	render(){

		var {message} = this.state
				let renderMessage = this.state.message.map((a,b)=>{
			return(
				<Text id = {b} message = {a} />
			)
		})
	return (
	    	<div id="App">
          <div id = "container" >
		{renderMessage}
          </div>

          <div id="chatBox">
          <input id ="chat" type="text" placeholder="dang buon a"></input>
          <button id ="submit" type = "submit" onClick={this.onSubmit}>Submit</button>
          </div>
    		</div>
  	);
	}
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(App), domContainer);
