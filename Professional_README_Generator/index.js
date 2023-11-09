// readline to take user input
const readline = require("readline");
// fs to read/write files
const fs = require("fs");
// creating an instance to take user input with standard terminal inputs (stdin)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var emptyReadme = {};

const ToCArray = [];

const greeting =
  "Welcome to my Professional README Generator! I'm going to ask you just a few simple questions about the project you need this for! At the end, a file will be created in this folder that you can copy to your own repository!";
console.log(greeting);
// Get user inputs  Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

titleQuestion();

function titleQuestion() {
  rl.question("What is the Title of your project? ", (titleInput) => {
    titleInput.trim();
    // If they answer nothing
    if (titleInput === "") {
      console.log("C'mon, every project needs a title!");
      titleQuestion();
    } else {
      emptyReadme.title =
        // Capitalizing first letter of Title for Professionalism
        titleInput.charAt(0).toUpperCase() + titleInput.slice(1).toLowerCase();
      console.log(`${emptyReadme.title}? That's a good name!`);
      descriptionQuestion();
    }
  });
}

function descriptionQuestion() {
  rl.question(
    "What is the Description of your project? ",
    (descriptionInput) => {
      descriptionInput.trim();
      // If they answer nothing
      if (descriptionInput === "") {
        console.log(
          `C'mon, every project needs a description! Briefly describe what "${emptyReadme.title}" does:`
        );
        descriptionQuestion();
      } else {
        emptyReadme.description =
          // Capitalizing first letter of Description for Professionalism
          descriptionInput.charAt(0).toUpperCase() +
          descriptionInput.slice(1).toLowerCase();
        console.log(`${emptyReadme.description}? That's a solid description!`);
        NeedToCQuestion();
      }
    }
  );
}

// ToC = "Table of Contents"
// Do you even need one for this README?
function NeedToCQuestion() {
  rl.question(
    "Some projects aren't large enough to need a Table of Contents. Will your README require one? (Y or N)  ",
    (needToCInput) => {
      needToCInput.trim();
      if (needToCInput === "Y" || needToCInput === "y") {
        console.log("You've chosen to have a Table of Contents!");
        YesToCQuestion();
      } else if (needToCInput === "N" || needToCInput === "n") {
        console.log(
          "You declined a Table of Contents for your README! Moving on..."
        );
        installQuestion();
      } else {
        console.log("Please only enter Y or N!");
        NeedToCQuestion();
      }
    }
  );
}

// If they say "yes" to having a ToC. Else we'll skip this function

function YesToCQuestion() {
  ToCArray.push("Title");
  ToCArray.push("Description");
  console.log(`Here's what's currently in your Table of Contents: ${ToCArray}`);
  installQuestion();
}

function installQuestion() {
  rl.question(
    "Briefly describe the Installation for your project:  ",
    (instalInput) => {
      instalInput.trim();
      // If they answer nothing
      if (instalInput === "") {
        console.log(
          "It's HIGHLY recommended that you describe how your users will boot up your project!"
        );
        installQuestion();
      } else {
        emptyReadme.installation =
          // Capitalizing first letter of Title for Professionalism
          instalInput.charAt(0).toUpperCase() +
          instalInput.slice(1).toLowerCase();
        ToCArray.push("Installation");
        console.log(
          `${emptyReadme.installation}? Sounds like it'll work to me!`
        );
        usageQuestion();
      }
    }
  );
}

function usageQuestion() {
  rl.question(
    "Briefly describe the Usage for your project:  ",
    (usageInput) => {
      usageInput.trim();
      // If they answer nothing
      if (usageInput === "") {
        console.log(
          "It's HIGHLY recommended that you cover the Usage of project!"
        );
        usageQuestion();
      } else {
        emptyReadme.usage =
          // Capitalizing first letter of Usage for Professionalism
          usageInput.charAt(0).toUpperCase() +
          usageInput.slice(1).toLowerCase();
        ToCArray.push("Usage");
        console.log(`${emptyReadme.usage}? Easy enough to do!`);
        NeedLicenseQuestion();
      }
    }
  );
}

function NeedLicenseQuestion() {
  rl.question(
    "Would you like to state your project's license? (Y or N)  ",
    (needLicenseInput) => {
      needLicenseInput.trim();
      if (needLicenseInput === "Y" || needLicenseInput === "y") {
        console.log(
          "You've chosen to have a section for your project's Licenses"
        );
        YesLicenseQuestion();
      } else if (needLicenseInput === "N" || needLicenseInput === "n") {
        console.log(
          "You declined a License section for your README! Moving on..."
        );
        NeedContributingQuestion();
      } else {
        console.log("Please only enter Y or N!");
        NeedLicenseQuestion();
      }
    }
  );
}

function YesLicenseQuestion() {
  rl.question(
    "Please enter any information regarding your licenses here: ",
    (licenseInput) => {
      licenseInput.trim();
      // If they answer nothing
      if (licenseInput === "") {
        console.log(
          "You can't enter nothing after opting to have this section!"
        );
        YesLicenseQuestion();
      } else {
        emptyReadme.license =
          // Capitalizing first letter of License for Professionalism
          licenseInput.charAt(0).toUpperCase() +
          licenseInput.slice(1).toLowerCase();
        ToCArray.push("License");
        console.log(`${emptyReadme.license}? That's a good license to have!`);
        NeedContributingQuestion();
      }
    }
  );
}

function NeedContributingQuestion() {
  rl.question(
    "Would you like to state your project's contributors (if any)? (Y or N)  ",
    (needContributeInput) => {
      needContributeInput.trim();
      if (needContributeInput === "Y" || needContributeInput === "y") {
        console.log(
          "You've chosen to have a section for your project's Contributors"
        );
        YesContributingQuestion();
      } else if (needContributeInput === "N" || needContributeInput === "n") {
        console.log(
          "You declined a Contributing section for your README! Moving on..."
        );
        NeedTestsQuestion();
      } else {
        console.log("Please only enter Y or N!");
        NeedContributingQuestion();
      }
    }
  );
}

var contributingArray = [];

function YesContributingQuestion() {
  rl.question(
    "Please enter each Contributor separately, and when you're done: simply enter 'DONE'  ",
    (contributeInput) => {
      contributeInput.trim();
      if (
        contributeInput === "DONE" ||
        contributeInput === "done" ||
        contributeInput === "Done"
      ) {
        emptyReadme.contributors = contributingArray;
        ToCArray.push("Contributors");
        console.log(
          `Awesome! Here's your list of Contributors: 
          ${emptyReadme.contributors}`
        );
        NeedTestsQuestion();
      } else if (
        contributeInput !== "DONE" ||
        contributeInput !== "done" ||
        contributeInput !== "Done"
      ) {
        contributingArray.push(contributeInput);
        console.log(`Here's what you've put so far: ${contributingArray}`);
        YesContributingQuestion();
      } else {
        console.log("You can't enter nothing!");
        console.log(`Here's what you've put so far: ${contributingArray}`);
        YesContributingQuestion();
      }
    }
  );
}

function NeedTestsQuestion() {
  rl.question(
    "A 'tests' section is meant to guide new contributors through your project in a safe manner. Would you like to state any tests you've already run on your project? (Y or N)  ",
    (needTestsInput) => {
      needTestsInput.trim();
      if (needTestsInput === "Y" || needTestsInput === "y") {
        console.log(
          "You've chosen to have a section to state your project's previously run tests!"
        );
        YesTestsQuestion();
      } else if (needTestsInput === "N" || needTestsInput === "n") {
        console.log(
          "You declined a Tests section for your README! Moving on..."
        );
        NeedQuestionQuestion();
      } else {
        console.log("Please only enter Y or N!");
        NeedTestsQuestion();
      }
    }
  );
}

var testsArray = [];

function YesTestsQuestion() {
  rl.question(
    "Please enter each Test separately, and when you're done: simply enter 'DONE'  ",
    (testsInput) => {
      testsInput.trim();
      if (
        testsInput === "DONE" ||
        testsInput === "done" ||
        testsInput === "Done"
      ) {
        emptyReadme.tests = testsArray;
        ToCArray.push("Tests");
        console.log(
          `Very nice! Here's your list of Tests: 
          ${emptyReadme.tests}`
        );
        NeedQuestionQuestion();
      } else if (
        testsInput !== "DONE" ||
        testsInput !== "done" ||
        testsInput !== "Done"
      ) {
        testsArray.push(testsInput);
        console.log(`Here's what you've put so far: ${testsArray}`);
        YesTestsQuestion();
      } else {
        console.log("You can't enter nothing!");
        console.log(`Here's what you've put so far: ${testsArray}`);
        YesTestsQuestion();
      }
    }
  );
}

// Sorry for bad naming, but it works with the current convention so...
function NeedQuestionQuestion() {
  rl.question(
    "A 'Questions' section is meant to 'pass the microphone' to anyone looking to further your project. Would you like to state any questions you'd like future contributors to address? (Y or N)  ",
    (needQuestionInput) => {
      needQuestionInput.trim();
      if (needQuestionInput === "Y" || needQuestionInput === "y") {
        console.log(
          "You've chosen to have a section to state your project's Questions!"
        );
        YesQuestionQuestion();
      } else if (needQuestionInput === "N" || needQuestionInput === "n") {
        console.log(
          "You declined a Questions section for your README! Moving on..."
        );
        NeedScreenshotsQuestion();
      } else {
        console.log("Please only enter Y or N!");
        NeedQuestionQuestion();
      }
    }
  );
}

var questionsArray = [];

function YesQuestionQuestion() {
  rl.question(
    "Please enter each Question separately, and when you're done: simply enter 'DONE'  ",
    (questionsInput) => {
      questionsInput.trim();
      if (
        questionsInput === "DONE" ||
        questionsInput === "done" ||
        questionsInput === "Done"
      ) {
        emptyReadme.questions = questionsArray;
        ToCArray.push("Questions");
        console.log(
          `Very nice! Here's your list of Questions: 
          ${emptyReadme.questions}`
        );
        NeedScreenshotsQuestion();
      } else if (
        questionsInput !== "DONE" ||
        questionsInput !== "done" ||
        questionsInput !== "Done"
      ) {
        questionsArray.push(questionsInput);
        console.log(`Here's what you've put so far: ${questionsArray}`);
        YesQuestionQuestion();
      } else {
        console.log("You can't enter nothing!");
        console.log(`Here's what you've put so far: ${questionsArray}`);
        YesQuestionQuestion();
      }
    }
  );
}

function NeedScreenshotsQuestion() {
  rl.question(
    "A 'Screenshots' section is a way to display the visual prowess of your project! You would need to add them in yourself, but would you like to include a section for them at the end of the README? (Y or N)  ",
    (needScreenshotsInput) => {
      needScreenshotsInput.trim();
      if (needScreenshotsInput === "Y" || needScreenshotsInput === "y") {
        console.log(
          "You've chosen to have a section to display your project's Screenshots!"
        );
        YesScreenshotsQuestion();
      } else if (needScreenshotsInput === "N" || needScreenshotsInput === "n") {
        console.log(
          "You declined a Screenshots section for your README! Moving on..."
        );
        FinishInputs();
      } else {
        console.log("Please only enter Y or N!");
        NeedScreenshotsQuestion();
      }
    }
  );
}

function YesScreenshotsQuestion() {
  ToCArray.push("Screenshots");
  emptyReadme.screenshots = true;
  FinishInputs();
}

function FinishInputs() {
  emptyReadme.tableOfContents = ToCArray;
  console.log(
    "Congrats, this finishes my line of questioning! Let's take a glimpse at what you've made:"
  );

  if (emptyReadme.tableOfContents) {
    console.log(` 
  Table of Contents:
  ${emptyReadme.tableOfContents}`);
  }

  console.log(`
  Title:
  ${emptyReadme.title}
  
  Description:
  ${emptyReadme.description}
  
  Installation:
  ${emptyReadme.installation}
  
  Usage:
  ${emptyReadme.usage}
  `);
  if (emptyReadme.license) {
    console.log(`
  License:
  ${emptyReadme.license}`);
  }
  if (emptyReadme.contributors) {
    console.log(`
  Contributors:
  ${emptyReadme.contributors}`);
  }
  if (emptyReadme.tests) {
    console.log(`
  Tests:
  ${emptyReadme.tests}`);
  }
  if (emptyReadme.questions) {
    console.log(`
  Questions:
  ${emptyReadme.questions}
  `);
  }

  console.log(
    "Look! In the 'Explorer' your new README file is next to 'index.js'!"
  );

  console.log(emptyReadme);
  createREADME(emptyReadme);
}

// CREATING README DOWN HERE

// All of these if's COULD and COULDN'T exist, using conditionals to create readme content
if (emptyReadme.tableOfContents) {
  let ToCSection = ` 
  ##Table of Contents:
  ${emptyReadme.tableOfContents}
  `;
} else {
  ToCSection = "";
}
if (emptyReadme.license) {
  var licenseSection = `
  ## License:
  ${emptyReadme.license}
  `;
} else {
  licenseSection = "";
}
if (emptyReadme.contributors) {
  var contributorsSection = `
  ## Contributors:
  ${emptyReadme.contributors}
  `;
} else {
  contributorsSection = "";
}
if (emptyReadme.tests) {
  var testsSection = `
  ## Tests:
  ${emptyReadme.tests}
  `;
} else {
  testsSection = "";
}
if (emptyReadme.questions) {
  var questionsSection = `
  ## Questions:
  ${emptyReadme.questions}
  `;
} else {
  questionsSection = "";
}
if (emptyReadme.screenshots) {
  var screenshotsSection = `## Screenshots`;
} else {
  screenshotsSection = "";
}

function createREADME(emptyReadme) {
  var readmeStructure = `# ${emptyReadme.title}

## Table of Contents
${emptyReadme.tableOfContents
  .map((section) => `- [${section}](#${section.toLowerCase()})`)
  .join("\n")}

## Description
${emptyReadme.description}

## Installation
${emptyReadme.installation}

## Usage
${emptyReadme.usage}

## License
${emptyReadme.license}

## Contributors
${emptyReadme.contributors}

## Tests
${emptyReadme.tests}

${emptyReadme.questions ? "## Questions" : ""}
${emptyReadme.questions ? `${emptyReadme.questions}` : ""}

${emptyReadme.screenshots ? "## Screenshots" : ""}


`;
  console.log(readmeStructure);
  fs.writeFileSync("README.md", readmeStructure, "utf8");
}
