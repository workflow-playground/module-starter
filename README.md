# YOUR MODULE

[![Built with Devbox](https://jetpack.io/img/devbox/shield_moon.svg)](https://jetpack.io/devbox/docs/contributor-quickstart/)

## Configuring your repository

This Repository is meant as a blueprint to develop applications.
Admins can adjust the configuration to their needs, but in order do use the pre-defined workflows, you need to adjust the configuration:

1. Adjust the `Repository Secrets` and add a `NPM_TOKEN` that has access to the private npm registry.
   - You can ask for help in the #devops channel on Slack to get a token for your repository

## Development

1. [Install devbox](https://www.jetpack.io/devbox/docs/installing_devbox/)
2. Start a new shell with all tools installed using `devbox shell`
3. Add the `NPM_TOKEN` as an environment variable to your shell (e.g. export NPM_TOKEN=...)
3. Start the module by running `just install && just start`
4. `open https://localhost:8000`

## Adding dependencies

If you need additional Services / Tools you can do so.
But you're required to provide them for other developers, too.

We cannot rely on devs to have the required tools in their dev envs.

### Add a new Tool

https://www.jetpack.io/devbox/docs/guides/pinning_packages/
https://www.jetpack.io/devbox/docs/guides/using_flakes/
