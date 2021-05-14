"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person, people);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  if(!foundPerson){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  else{ 
    return foundPerson[0];
  }
}

function searchByTrait(people){
  let completedQuery = [];
  let gender = promptFor("What is the person's gender?", chars);
  // let dob = promptFor("What is the person's date of birth?", chars);
  // let weight = promptFor("What is the person's weight?", chars);
  // let height = promptFor("What is the person's height?", chars);
  // let eyeColor = promptFor("What is the person's eye color?", chars);

  let foundTrait = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  if(!foundTrait){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  else{ 
    return foundTrait;
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person, people) {
  let parent = retrieveParents(person, people);
  let spouse = retrieveSpouse(person, people);
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + parent + "\n";
  personInfo += "Spouse: " + spouse + "\n";
  alert(personInfo);
}

function retrieveParents(person, people) {
  let parents = [];
  let parentsReturned = "";

  if(person.parents.length === 0) {
    return "No Parents";
  }
  else {
    parents = people.filter(function(element) {
      if(element.id === person.parents[0] || element.id === person.parents[1]){
        return true;
      }
    });
  }
  for (let i = 0; i < parents.length; i++) {
    parentsReturned += parents[i].firstName + " " + parents[i].lastName + ". ";
  }
  return parentsReturned;
}

function retrieveSpouse(person, people) {
  let spouse;
  let spouseArr = [];
  let spouseReturned = "";

  if(person.currentSpouse === null) {
    return "No Spouse";
  }
  else {
    spouseArr = people.filter(function(element) {
      if(element.id === person.currentSpouse){
        return true;
      }
    });
  }
  spouse = spouseArr.pop();
  spouseReturned = spouse.firstName + " " + spouse.lastName;
  return spouseReturned;
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
