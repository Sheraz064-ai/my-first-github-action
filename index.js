const core = require("@actions/core");
const github = require("@actions/github");
const lintPR = require("./validators/lintPR");

async function run() {
  try {
    const PRContext = github.context.payload.pull_request;
    const client = github.getOctokit(core.getInput("token"));

    const owner = PRContext.base.user.login;
    const repo = PRContext.base.repo.name;
    const PRInstance = await client.rest.pulls.get({
      owner,
      repo,
      pull_number: PRContext.number,
    });

    const isPRTitleValid = await lintPR(client, {
      number: PRContext.number,
      title: PRInstance.data.title,
      owner,
      repo,
    });

    if (!isPRTitleValid) {
      throw { message: "PR title is invalid" };
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
