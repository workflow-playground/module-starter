# https://just.systems/man/en/
# Just is inspired by makefile syntay but avoids some ot its [caveats](https://just.systems/man/en/chapter_75.html). 

build:
    just backend/build

develop:
    just backend/develop
    
fix:
    just backend/fix
    
test:
    just backend/test