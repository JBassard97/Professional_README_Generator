// readline to take user input
const readline = require("readline");
// fs to read/write files
const fs = require("fs");
// creating an instance to take user input with standard terminal inputs (stdin)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const colors = require("jbassard97nodecolors");

const emptyReadme = {};

const ToCArray = [];

const greeting =
  "Welcome to my Professional README Generator! I'm going to ask you just a few simple questions about the project you need this for! At the end, a file will be created in this folder that you can copy to your own repository!";
console.log("\n", colors.MagentaText(greeting), "\n");
// Get user inputs  Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

titleQuestion();

function titleQuestion() {
  rl.question(
    `What is the ${colors.RainbowText("Title")} of your project? `,
    (titleInput) => {
      titleInput.trim();
      // If they answer nothing
      if (titleInput === "") {
        console.log(
          colors.BrightRedText("C'mon, every project needs a title!")
        );
        titleQuestion();
      } else {
        emptyReadme.title =
          // Making JUST first character UpperCase for Professionalism
          titleInput.charAt(0).toUpperCase() + titleInput.slice(1);
        console.log(
          `${colors.BrightCyanText(emptyReadme.title)}? That's a good name!`,
          "\n"
        );
        descriptionQuestion();
      }
    }
  );
}

function descriptionQuestion() {
  rl.question(
    `What is the ${colors.RainbowText("Description")} of your project? `,
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
          descriptionInput.charAt(0).toUpperCase() + descriptionInput.slice(1);
        console.log(
          `${colors.BrightGreenText("That's a solid description!")}`,
          "\n"
        );
        NeedToCQuestion();
      }
    }
  );
}

// ToC = "Table of Contents"
// Do you even need one for this README?
function NeedToCQuestion() {
  rl.question(
    `Some projects aren't large enough to need a ${colors.RainbowText(
      "Table of Contents"
    )}. Will your README require one? (Y or N)  `,
    (needToCInput) => {
      needToCInput.trim();
      if (needToCInput === "Y" || needToCInput === "y") {
        console.log("You've chosen to have a Table of Contents!");
        YesToCQuestion();
      } else if (needToCInput === "N" || needToCInput === "n") {
        console.log(
          colors.RedText(
            "You declined a Table of Contents for your README! Moving on..."
          ),
          "\n"
        );
        installQuestion();
      } else {
        console.log(colors.BrightRedText("Please only enter Y or N!"));
        NeedToCQuestion();
      }
    }
  );
}

// If they say "yes" to having a ToC. Else we'll skip this function

function YesToCQuestion() {
  ToCArray.push("Title");
  ToCArray.push("Description");
  console.log(
    `${colors.BrightYellowText(
      "Here's what's currently in your Table of Contents:"
    )} ${ToCArray}`,
    "\n"
  );
  installQuestion();
}

function installQuestion() {
  rl.question(
    `Briefly describe the ${colors.RainbowText(
      "Installation"
    )} for your project:  `,
    (instalInput) => {
      instalInput.trim();
      // If they answer nothing
      if (instalInput === "") {
        console.log(
          colors.BrightRedText(
            "It's HIGHLY recommended that you describe how your users will boot up your project!"
          )
        );
        installQuestion();
      } else {
        emptyReadme.installation =
          instalInput.charAt(0).toUpperCase() + instalInput.slice(1);
        ToCArray.push("Installation");
        console.log(
          colors.BrightCyanText(`Sounds like it'll work to me!`),
          "\n"
        );
        NeedLinkQuestion();
      }
    }
  );
}

function NeedLinkQuestion() {
  rl.question(
    `The next section will cover Usage. Would you like to add a ${colors.RainbowText(
      "Link"
    )} your project at the top of Usage? (Y or N)  `,
    (needLinkInput) => {
      needLinkInput.trim();
      if (needLinkInput === "Y" || needLinkInput === "y") {
        console.log(
          "You've chosen to have a section for your project's Licenses"
        );
        YesLinkQuestion();
      } else if (needLinkInput === "N" || needLinkInput === "n") {
        console.log(
          "You declined to link your project in your README! Moving on..."
        );
        usageQuestion();
      } else {
        console.log(colors.BrightRedText("Please only enter Y or N!"));
        NeedLinkQuestion();
      }
    }
  );
}

function YesLinkQuestion() {
  rl.question("Please enter the link to the project here: ", (linkInput) => {
    linkInput.trim();
    // If they answer nothing
    if (linkInput === "") {
      console.log(
        colors.BrightRedText(
          "You can't enter nothing after opting to have this section!"
        )
      );
      YesLinkQuestion();
    } else {
      emptyReadme.projectLink = linkInput;
      console.log(
        colors.BrightMagentaText(
          `A link to your project will be included! Excellent choice!`
        ),
        "\n"
      );
      usageQuestion();
    }
  });
}

function usageQuestion() {
  rl.question(
    `Briefly describe the ${colors.RainbowText("Usage")} for your project:  `,
    (usageInput) => {
      usageInput.trim();
      // If they answer nothing
      if (usageInput === "") {
        console.log(
          colors.BrightRedText(
            "It's HIGHLY recommended that you cover the Usage of project!"
          )
        );
        usageQuestion();
      } else {
        emptyReadme.usage =
          usageInput.charAt(0).toUpperCase() + usageInput.slice(1);
        ToCArray.push("Usage");
        console.log(colors.BrightBlueText(`Easy enough to do!`), "\n");
        NeedLicenseQuestion();
      }
    }
  );
}

function NeedLicenseQuestion() {
  rl.question(
    `Would you like to state your project's ${colors.RainbowText(
      "License"
    )}? (Y or N)  `,
    (needLicenseInput) => {
      needLicenseInput.trim();
      if (needLicenseInput === "Y" || needLicenseInput === "y") {
        console.log(
          "You've chosen to have a section for your project's License"
        );
        YesLicenseQuestion();
      } else if (needLicenseInput === "N" || needLicenseInput === "n") {
        console.log(
          colors.RedText(
            "You declined a License section for your README! Moving on..."
          )
        );
        NeedContributingQuestion();
      } else {
        console.log(colors.BrightRedText("Please only enter Y or N!"));
        NeedLicenseQuestion();
      }
    }
  );
}

function YesLicenseQuestion() {
  rl.question("Please enter your project's license here: ", (licenseInput) => {
    licenseInput.trim();
    // If they answer nothing
    if (licenseInput === "") {
      console.log(
        `${colors.BrightRedText(
          "You can't enter nothing after opting to have this section!"
        )}`
      );
      YesLicenseQuestion();
    } else {
      emptyReadme.license =
        licenseInput.charAt(0).toUpperCase() + licenseInput.slice(1);
      ToCArray.push("License");
      console.log(
        colors.BrightGreenText(
          `${emptyReadme.license}? That's a good license to have!`
        ),
        "\n"
      );
      NeedContributingQuestion();
    }
  });
}

function NeedContributingQuestion() {
  rl.question(
    `Would you like to state your project's ${colors.RainbowText(
      "Contributors"
    )} (if any)? (Y or N)  `,
    (needContributeInput) => {
      needContributeInput.trim();
      if (needContributeInput === "Y" || needContributeInput === "y") {
        console.log(
          colors.BrightBlueText(
            "You've chosen to have a section for your project's Contributors"
          )
        );
        YesContributingQuestion();
      } else if (needContributeInput === "N" || needContributeInput === "n") {
        console.log(
          colors.RedText(
            "You declined a Contributing section for your README! Moving on..."
          )
        );
        NeedTestsQuestion();
      } else {
        console.log(colors.BrightRedText("Please only enter Y or N!"));
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
          colors.BrightCyanText(
            `Awesome! Here's your list of Contributors: 
          ${emptyReadme.contributors}`
          ),
          "\n"
        );
        NeedTestsQuestion();
      } else if (
        contributeInput !== "DONE" ||
        contributeInput !== "done" ||
        contributeInput !== "Done"
      ) {
        contributingArray.push(contributeInput);
        console.log(
          colors.BrightMagentaText(
            `Here's what you've put so far: ${contributingArray}`
          )
        );
        YesContributingQuestion();
      } else {
        console.log(colors.BrightRedText("You can't enter nothing!"));
        console.log(`Here's what you've put so far: ${contributingArray}`);
        YesContributingQuestion();
      }
    }
  );
}

function NeedTestsQuestion() {
  rl.question(
    `A ${colors.RainbowText(
      "Tests"
    )} section is meant to guide new contributors through your project in a safe manner. Would you like to state any tests you've already run on your project? (Y or N)  `,
    (needTestsInput) => {
      needTestsInput.trim();
      if (needTestsInput === "Y" || needTestsInput === "y") {
        console.log(
          colors.BrightCyanText(
            "You've chosen to have a section to state your project's previously run tests!"
          )
        );
        YesTestsQuestion();
      } else if (needTestsInput === "N" || needTestsInput === "n") {
        console.log(
          colors.RedText(
            "You declined a Tests section for your README! Moving on..."
          ),
          "\n"
        );
        NeedQuestionQuestion();
      } else {
        console.log(colors.BrightRedText("Please only enter Y or N!"));
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
          colors.BrightYellowText(`Very nice! Here's your list of Tests: 
          ${emptyReadme.tests}`),
          "\n"
        );
        NeedQuestionQuestion();
      } else if (
        testsInput !== "DONE" ||
        testsInput !== "done" ||
        testsInput !== "Done"
      ) {
        testsArray.push(testsInput);
        console.log(
          colors.BrightYellowText(
            `Here's what you've put so far: ${testsArray}`
          )
        );
        YesTestsQuestion();
      } else {
        console.log(colors.BrightRedText("You can't enter nothing!"));
        console.log(
          colors.BrightYellowText(
            `Here's what you've put so far: ${testsArray}`
          )
        );
        YesTestsQuestion();
      }
    }
  );
}

// Sorry for bad naming, but it works with the current convention so...
function NeedQuestionQuestion() {
  rl.question(
    `A ${colors.RainbowText(
      "Questions"
    )} section is meant to 'pass the microphone' to anyone looking to further your project. Would you like to state any questions you'd like future contributors to address? (Y or N)  `,
    (needQuestionInput) => {
      needQuestionInput.trim();
      if (needQuestionInput === "Y" || needQuestionInput === "y") {
        console.log(
          "You've chosen to have a section to state your project's Questions!"
        );
        YesQuestionQuestion();
      } else if (needQuestionInput === "N" || needQuestionInput === "n") {
        console.log(
          colors.RedText(
            "You declined a Questions section for your README! Moving on..."
          ),
          "\n"
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
          colors.BrightCyanText(`Very nice! Here's your list of Questions: 
          ${emptyReadme.questions}`),
          "\n"
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
    `A ${colors.RainbowText(
      "Screenshots"
    )} section is a way to display the visual prowess of your project! You would need to add them in yourself, but would you like to include a section for them at the end of the README? (Y or N)  `,
    (needScreenshotsInput) => {
      needScreenshotsInput.trim();
      if (needScreenshotsInput === "Y" || needScreenshotsInput === "y") {
        console.log(
          "You've chosen to have a section to display your project's Screenshots!"
        );
        YesScreenshotsQuestion();
      } else if (needScreenshotsInput === "N" || needScreenshotsInput === "n") {
        console.log(
          colors.RedText(
            "You declined a Screenshots section for your README! Moving on..."
          ),
          "\n"
        );
        FinishInputs();
      } else {
        console.log(colors.BrightRedText("Please only enter Y or N!"));
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
  // Closing questioning interface
  rl.close();

  createREADME(emptyReadme);
}

// CREATING README DOWN HERE

function createREADME(emptyReadme) {
  console.clear();
  const readmeStructure = `# ${emptyReadme.title}

## Table of Contents
${emptyReadme.tableOfContents
  .map((section) => `- [${section}](#${section.toLowerCase()})`)
  .join("\n")}

## Description

${emptyReadme.description}

## Installation

${emptyReadme.installation}

## Usage
${
  emptyReadme.projectLink ? `Link to project: ${emptyReadme.projectLink}\n` : ""
}

${emptyReadme.usage}

${emptyReadme.license ? "## License" : ""}
${emptyReadme.license ? `${emptyReadme.license}` : ""}

${emptyReadme.contributors ? "## Contributors" : ""}
${
  emptyReadme.contributors
    ? `${emptyReadme.contributors.map((item) => `- ${item}`).join("\n")}`
    : ""
}

${emptyReadme.tests ? "## Tests" : ""}
${
  emptyReadme.tests
    ? `${emptyReadme.tests.map((item) => `- ${item}`).join("\n")}`
    : ""
}

${emptyReadme.questions ? "## Questions" : ""}
${
  emptyReadme.questions
    ? `${emptyReadme.questions.map((item) => `- ${item}`).join("\n")}`
    : ""
}

${emptyReadme.screenshots ? "## Screenshots" : ""}


`;

  // RegExp to remove excess vertical spacing before finally shipping it
  const cleanedReadme = readmeStructure.replace(/^\s*[\r\n]/gm, "");
  console.log(
    "Congrats, this finishes my line of questioning! Let's take a glimpse at what you've made:",
    "\n"
  );

  console.log(colors.GreenText(cleanedReadme), "\n");

  console.log(
    colors.RainbowText(
      "Look! In the 'Explorer' your new README file is next to 'index.js'!"
    ),
    "\n"
  );

  // The final line that writes the README
  fs.writeFileSync("README.md", cleanedReadme, "utf8");
}
