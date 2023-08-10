# Backend

## Setup

```bash
just build
just start
```

## Dependencies

| Name                      | Description                                                                                                          | How to                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| Phive                     | Additional tools for CI-Checks etc. We install them using phive to avoid dependency conflicts with composer packages | `phive install my-package --target bin/` |
| Composer                  | Dependency manager for PHP                                                                                           | `composer require my-package`            |
| Composer dev dependencies | Dependencies for deveopment / testing                                                                                | `composer require --dev my-package`      |