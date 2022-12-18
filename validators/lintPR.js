const core = require("@actions/core");
const github = require("@actions/github");

module.exports = async function lintPR(client, pr) {
  const prTitleRegex = core.getInput("title-regex");
  console.log(prTitleRegex)
  const regExp = new RegExp(/^(FEATURE|FIX|TASK)\s\|\sISSUE\s\#[1-9]{1,}\s\|\s[\w\s]*$/, "gm");
  const isTitleValid = regExp.test(pr.title);
  if (!isTitleValid) {
    await client.rest.issues.createComment({
      owner: pr.owner,
      repo: pr.repo,
      issue_number: pr.number,
      body: "The format of pull request title is <strong>invalid</strong>",
    });
  }
  return isTitleValid;
};
