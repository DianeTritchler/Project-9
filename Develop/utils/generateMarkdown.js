const { cond } = require("lodash");

//Creates License Section of Readme
function renderLicenseSection(license) {
  //Returns 'empty' if no License selected
  if(license === 'None') return ``;

  //Returns License Section - based on user selection
  return `
  ## License
  The application is covered under the ${license} license.

  ![Badge](https://img.shields.io/badge/License-${license}-blue.svg)
  `;
}

//Creates Collaborators Section of Readme
function renderCollaborators(data){
  //Returns 'empty' if user chose not to list any 
  if(!data.confirmCollaborators) return ``;

  //Returns Collaborators Section - based on users input
  return `
  ## Collaborators
  ${data.collaborators} `;
}

//Creates Tests Section of Readme
function renderTests(data){
  //Returns 'empty' if user chose no tests
  if(!data.confirmTests) return ``;

  //Returns Tests Section - based on users input
  return `
  ## Tests
  ${data.tests}`;
}

function renderTableContents(data){
  let conditionalTableData = ``;
  if(data.license != 'None'){
    conditionalTableData = conditionalTableData + `* License
    ß`;
  }
  
  if(data.confirmCollaborators){
    conditionalTableData = conditionalTableData + `* Collaborators
    `;
  }

  if(data.confirmTests){
    conditionalTableData = conditionalTableData + `* Tests
    `;
  }
  
  return conditionalTableData;
}

//Creates Readme layout with conditional formating based on user input
function generateMarkdown(data) {
  return `# ${data.title}
  ![Github licence](https://img.shields.io/badge/license-${data.license}-blue.svg)
  ## Description
  ${data.description}
  ## Table of Contents
  * Installation
  * Usage
  ${renderTableContents(data)}
  * Questions

  ## Installation
  ${data.install}
  ## Usage
  ${data.usage}
  ${renderLicenseSection(data.license)}
  ${renderTests(data)}
  ${renderCollaborators(data)}
  ## Questions
  If you have any questions about this project, please contact me directly at ${data.email}.
  You can view more of my projects at https://github.com/${data.github}.
  `;
}

module.exports = generateMarkdown;
