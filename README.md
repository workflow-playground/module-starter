# YOUR MODULE

[![Built with Devbox](https://jetpack.io/img/devbox/shield_moon.svg)](https://jetpack.io/devbox/docs/contributor-quickstart/)

## Development

1. [Install devbox](https://www.jetpack.io/devbox/docs/installing_devbox/)
2. Start a new shell with all tools installed using `devbox shell`
3. Start the module by running `just build && just start`
4. `open https://localhost:8000`

## Adding dependencies

If you need additional Services / Tools you can do so.
But you're required to provide them for other developers, too.

We cannot rely on devs to have the required tools in their dev envs.

### Adding a new Tool

https://www.jetpack.io/devbox/docs/guides/pinning_packages/
https://www.jetpack.io/devbox/docs/guides/using_flakes/

## Translations

We expect translations to be done in the Frontend-Application.
The backend application should not handle any translations.