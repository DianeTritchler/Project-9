// Required Packages
const fs = require('fs');
const inquirer = require('inquirer');
const generateReadme = require('./utils/generateMarkdown');

console.log("Test"); //Testing

// Propts users with questions about their project
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the Title of your Project? (Required)',
            validate: titleInput =>{
                if(titleInput) {
                    return true;
                } else {
                    console.log('Please enter a Title for you Project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Describe your Project (Required)',
            validate: descriptionInput =>{
                if(descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a Description for your Project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput =>{
                if(githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address (Required)',
            validate: emailInput =>{
                if(emailInput) {
                    return true;
                } else {
                    console.log('Please enter your Email!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'install',
            message: 'What are the steps required to install your project? (Required)',
            validate: installInput =>{
                if(installInput) {
                    return true;
                } else {
                    console.log('Please provide the steps to install your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmCollaborators',
            message: 'Would you like to list any collaborators? (Required)',
            defult: true
        },
        {
            type: 'input',
            name: 'collaborators',
            message: 'Enter any information about your collaborators:',
            when: ({ confirmCollaborators }) => confirmCollaborators
        },
        {
            type: 'confirm',
            name: 'confirmTests',
            message: 'Do you have tests for you application? (Required)',
            defult: true
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Enter any information about your tests:',
            when: ({ confirmTests }) => confirmTests
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your project.',
            choice:[ 'None','MIT','GNU-AGPLv3', 'GNU-LGPLv3', 'Mozilla-Public-License-2.0', 
                'Apache-License-2.0', 'Boost-Software-License-1.0', 'GNU-GPLv3' ]
        }
    ]);
}

//Creates README.md and checks for errors
const writeFile = data => {
    fs.writeFile('README.md', data, (err) => {
        //Checks for Error
        if(err){
            console.log(err);
            throw err;
        }
        else{
            console.log("Your README has been created! Check out README.md");
        }
    })
};



promptUser()
.then(anwsers => {
    return generateReadme(anwsers);
})
.then(data => {
    return writeFile(data);
})
.catch(err => {
    console.log(err);
})
