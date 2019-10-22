const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
	try {
		const myToken = core.getInput('myToken');
		const octokit = new github.GitHub(myToken);
		switch (github.context.payload.repository.name) {
			case "mm26-design":
				label = "Team: Design";
				break;
			case "mm26-engine":
				label = "Team: Engine";
				break;
			case "mm26-visualizer":
				label = "Team: Visualizer";
				break;
			case "mm26-infra":
				label = "Team: Infrastructure"
				break;
		}


		octokit.issues.addLabels({
			owner: github.context.payload.repository.owner.login,
			repo: github.context.payload.repository.name,
			issue_number: github.context.payload.issue.number,
			labels: [label]
		}).catch(function (rejection) {
			console.log(rejection);
		});
	}
	catch (error) {
		core.setFailed(error.message);
	}
}

run()