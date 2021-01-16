import React, {useState, useEffect} from 'react';
import Table from './Table'
import Form from './Form';
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter (index) {
    const updated = characters.filter((character, i) => {
       return i !== index
    });
    setCharacters(updated);
  }

  async function fetchAll(){
   try {
      //makes get request through our API on the backend
      const response = await axios.get('http://localhost:5000/users');
      console.log(response.data.users_list)
      return response.data.users_list;     
   }
   catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;         
   }
}

  //call fetchAll function, if we get list of users update state of characters
  //called once when MyApp comp. first mounts, (after that, changes are made by adding/removing 
  //chars from the state)
  useEffect(() => {
   fetchAll().then( result => {
      if (result)
         setCharacters(result);
    });
}, [] );

  async function makePostCall(person){
   try {
      //generate random id of 5 for person
      person.id = generateId()
      console.log(person.id);
      const response = await axios.post('http://localhost:5000/users', person);
      return response;
   }
   catch (error) {
      console.log(error);
      return false;
   }
}
  function generateId(){
    return Math.random().toString(36).substr(2, 5);
  }

  //why does this coditional run?
  function updateList(person) { 
     makePostCall(person).then( result => {
     if (result.status === 201) {
        setCharacters([...characters, person] );
     }
     });
  }


  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList}/>
    </div>
  )
}

export default MyApp;