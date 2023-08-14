# https://just.systems/man/en/
# Just is inspired by makefile syntay but avoids some ot its [caveats](https://just.systems/man/en/chapter_75.html). 

install:
    just e2e/install
    just frontend/install

build:
    just backend/build
    just frontend/build

start:
    just backend/start
    just frontend/start
    
fix:
    just backend/fix
    just frontend/fix

lint:
    jsut frontend/lint
    
test:
    just backend/test
    just frontend/test

e2e:
    just e2e/test