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
      displayFamily(person, people);
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
    if(person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()){
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
  let returnedTrait = "";
  let filteredTraits;

  filteredTraits = searchByDOB(people);
  filteredTraits = searchByHeight(filteredTraits);
  filteredTraits = searchByWeight(filteredTraits);
  filteredTraits = searchByEyeColor(filteredTraits)
  filteredTraits = searchByOccupation(filteredTraits);

  if(filteredTraits.length === 0) {
    alert("No results found.");
  }
  else {
    for(let i = 0; i < filteredTraits.length; i++) {
      returnedTrait += filteredTraits[i].firstName + " " + filteredTraits[i].lastName + ".";
    }
    alert(returnedTrait);
  }
  app(people);
}

function searchByDOB(people) {
  let dobSearch = promptFor("Do you want to search by date of birth? Enter yes or no", yesNo).toLowerCase();
  switch(dobSearch) {
    case "yes":
      let locateDOB = dobFilter(people);
      return locateDOB;
    case "no":
      return people;
    default:
      searchByEyeColor(people);
      break;
  }
}

function dobFilter(people) {
  let dob = promptFor("What is the person's date of birth?", chars);
  let dobArr = people.filter(function(element) {
    if(people.dob === dob) {
      return true;
    }
  });
  return dobArr;
}

function searchByHeight(people) {
  let heightSearch = promptFor("Do you want to search by height? Enter yes or no.", yesNo).toLowerCase();
  switch(heightSearch) {
    case "yes":
      let locateHeight = heightFilter(people);
      return locateHeight;
    case "no":
      return people;
    default:
      searchByHeight(people);
      break;
  }
}

function heightFilter(people) {
  let height = promptFor("What is the person's height in inches?", chars);
  let heightArr = people.filter(function(element) {
    if(people.height === height) {
      return true;
    }
  });
  return heightArr;
}

function searchByWeight(people) {
  let weightSearch = promptFor("Do you want to search by weight? Enter yes or no", yesNo).toLowerCase();
  switch(weightSearch) {
    case "yes":
      let locateWeight = weightFilter(people);
      return locateWeight;
    case "no":
      return people;
    default:
      searchByWeight(people);
    break;
  }
}

function weightFilter(people) {
  let weight = promptFor("What is the person's weight?", chars);
  let weightArr = people.filter(function(element) {
    if(people.weight === weight) {
      return true;
    }
  });
  return weightArr;
}

function searchByEyeColor(people) {
  let eyeColorSearch = promptFor("Do you want to search by eye color? Enter yes or no", yesNo).toLowerCase();
  switch(eyeColorSearch) {
    case "yes":
      let locateEyeColor = eyeColorFilter(people);
      return locateEyeColor;
    case "no":
      return people;
    default:
      searchByEyeColor(people);
    break;
  }
}

function eyeColorFilter(people) {
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let eyeArr = people.filter(function(element) {
    if(people.eyeColor === eyeColor) {
      return true;
    }
  });
  return eyeArr;
}

function searchByOccupation(people) {
  let occupationSearch = promptFor("Do you want to search by occupation? Enter yes or no", yesNo).toLowerCase();
  switch(occupationSearch) {
    case "yes":
      let locateOccupation = occupationFilter(people);
      return locateOccupation;
    case "no":
      return people;
    default:
      searchByOccupation(people);
      break;
  }
}

function occupationFilter(people) {
  let occupation = promptFor("What is the person's occupation?", chars);
  let occArr = people.filter(function(element) {
    if(occupation.height === occupation) {
      return true;
    }
  });
  return occArr;
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

function displayFamily (person, people) {
  let parent = retrieveParents(person, people);
  let spouse = retrieveSpouse(person, people);
  let siblings = retrieveSiblings(person, people);
  let personInfo = "Parents: " + parent + "\n";
  personInfo += "Spouse: " + spouse + "\n";
  personInfo += "Siblings: " + siblings + "\n"; //need siblings function
  alert(personInfo);
}

function retrieveParents(person, people) {
  let parents = [];
  let parentsReturned = "";

  if(person.parents.length === 0) {
    return "No Parents Found";
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

function retrieveSiblings(person, people) {
  let siblings = [];
  let siblingsReturned = "";

  if(person.parents.length === 0) {
    return "No Siblings Found";
  }
  else {
    siblings = people.filter(function(element) {
      if ((element.parents[0] || element.parents[1] === person.parents[0] || person.parents[1]) && (person.id[0] || person.id[1] !== people.id[i])) {
        return true;
      }
      else {
        return false;
      }
    });
  }
  for (let i = 0; i < siblings.length; i++) {
    siblingsReturned += siblings[i].firstName + " " + siblings[i].lastName + ". ";
  }
  return siblingsReturned;
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
