const core = require("@actions/core");
const github = require("@actions/github");

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

    console.log("pr: ", PRInstance.data.title, PRInstance.data.body);

    await client.rest.pulls.createReviewComment({
      owner,
      repo,
      pull_number: PRContext.number,
      body: "Nice!!",
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
