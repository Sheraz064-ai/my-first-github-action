const core = require("@actions/core");
const github = require("@actions/github");

module.exports = async function lintPR(client, pr) {
  const prTitleRegex = core.getInput("title-regex");
  const regExp = new RegExp(prTitleRegex, "gm");
  const isTitleValid = regExp.test(pr.title);
  if (!isTitleValid) {
    await client.rest.issues.createComment({
      owner: pr.owner,
      repo: pr.repo,
      issue_number: pr.number,
      body: "The format of pull request title is <strong>invalid</strong>",
    });
    await client.rest.issues.addLabels({
      owner,
      repo,
      issue_number: PRContext.number,
      labels: ["PR validated failed"],
    });
  }
  return isTitleValid;
};
