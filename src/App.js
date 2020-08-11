import React from 'react';
import logo from './logo.svg';
import './App.css';


// Controlled Multiple-Input Component for Input Block
function MultipleInputForm(props) {
      var style={ display:"block" }
      var activity_list = ['Science Lab', 'Swimming', 'Cooking', 'Painting']
      var checkbox_lists = ['a) Dietary Restrictions', 'b) Physical Disabilities', 'c) Medical Needs']
      var options = activity_list.map( (item) =>
                                       <option value={item}>{item}</option> )
      var checkboxes = checkbox_lists.map( (item, key) => {
                    return( <div>
                            <input type="checkbox" id={item.charAt(0)} name={item.charAt(0)} checked={props.restrictions[item.charAt(0)]} onChange={(e) => props.handleChange(e)} />
                            <label for={item.charAt(0)}>{item}</label>
                            </div>
                          ) } )
      return(
        <form>
          <label style={style} for="firstname">First Name</label>
           <input id="firstname" name="first_name" value={props.first_name} onChange={(e) => props.handleChange(e)} />
          <label style={style} for="lastname">Last Name</label>
           <input id="lastname" name="last_name" value={props.last_name} onChange={(e) => props.handleChange(e)} />
           <label style={style} for="dropdown">Last Name</label>
           <select id="dropdown" name="activity" value={props.activity} onChange={(e) => props.handleChange(e)} >
              {options}
           </select>
           <label style={style}>Check all that apply</label>
           {checkboxes}
           <button type="button">Submit</button>
        </form>
      )
}

// text en gras
function RegistrationText(props){
    var style = {
            fontWeight: 'bold',
            width: props.width
    }
    return (
      <div style={style}>{props.text}</div>
    )
}

// button x to delete an item
function CancelButton(props){
  var style = { }
  return (
      <button>x</button>
    )
}

// registration header
function RegistrationHeader(props){
    var style = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%"
    }
    return (
      <div style={style}>
          <RegistrationText text="Remove" />
          <RegistrationText text="First Name" />
          <RegistrationText text="Last Name" />
          <RegistrationText text="Acivity" />
          <RegistrationText text="Restrictions" />
      </div>
    )
}

// an item with a button x and 4 attributes
function Registration(props){
    return (
      <div>
          <CancelButton/>
          <RegistrationText text={props.first_name} />
          <RegistrationText text={props.last_name} />
          <RegistrationText text={props.activity} />
          <RegistrationText text={props.restrictions} />
      </div>
    )
}

function RegistrationList(props) {
  var style = { }
  var items = props.registrations.map( (item) =>
                    <Registration first_name={item.first_name}
                                  last_name={item.last_name}
                                  activity={item.activity}
                                  restrictions={item.restrictions}
                                  remove_item={item.remove_item}
                    /> )
  return (
    <ul>
      {items}
    </ul>
  )
}

// Main App component
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {registrations:[], inputs:{}}
    this.handleChange = this.handleChange.bind(this)
    this.handleCheck= this.handleCheck.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  // handleChange for first name input
  handleChange(event){
      this.setState({[event.target.name]: event.target.value})
      console.log(this.state)
  }

  handleCheck(event){
      this.setState({[event.target.name]: event.target.checked})
      console.log(this.state)
  }

  // add a registration to the list
  addRegistration(){
    // copy from this.state
    var copiedRegistrations = this.state.registrations.slice()
    // push it to copiedArray
    copiedRegistrations.push({first_name:this.state.firstName,
                              last_name:this.state.lastName,
                              activity: this.state.activity,
                              restrictions: this.state.restrictions})
    // update state
    this.setState({registrations:copiedRegistrations})
  }

  removeItem(){
  }

  render(){
    return (
      <div>
        <MultipleInputForm handleChange={this.handleChange}
                           handleCheck={this.handleCheck}
                           first_name={this.state.first_name}
                           last_name={this.state.last_name}
                           acitvity={this.state.activity}
                           restrictions={{a: this.state.a, b: this.state.b, c:this.state.c}} />
        <RegistrationHeader />
        <RegistrationList registrations={this.state.registrations} removeItem={this.removeItem} />
      </div>
    )
  }
}
export default App;
