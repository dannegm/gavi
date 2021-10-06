#!/bin/bash

export REACT_APP_EDITOR_MODE=false

rm -rf ./exportables || true
mkdir ./exportables || true

yarn build
mv ./build ./exportables/gavi-public
zip -r ./exportables/gavi-public.zip ./exportables/gavi-public

export REACT_APP_DEFAULT_GRADE=1
yarn build
mv ./build ./gavi-aprende1
zip -r ./exportables/gavi-aprende1.zip ./gavi-aprende1
rm -rf ./gavi-aprende1

export REACT_APP_DEFAULT_GRADE=2
yarn build
mv ./build ./gavi-aprende2
zip -r ./exportables/gavi-aprende2.zip ./gavi-aprende2
rm -rf ./gavi-aprende2

export REACT_APP_DEFAULT_GRADE=3
yarn build
mv ./build ./gavi-aprende3
zip -r ./exportables/gavi-aprende3.zip ./gavi-aprende3
rm -rf ./gavi-aprende3

export REACT_APP_DEFAULT_GRADE=4
yarn build
mv ./build ./gavi-aprende4
zip -r ./exportables/gavi-aprende4.zip ./gavi-aprende4
rm -rf ./gavi-aprende4

export REACT_APP_DEFAULT_GRADE=5
yarn build
mv ./build ./gavi-aprende5
zip -r ./exportables/gavi-aprende5.zip ./gavi-aprende5
rm -rf ./gavi-aprende5

export REACT_APP_DEFAULT_GRADE=6
yarn build
mv ./build ./gavi-aprende6
zip -r ./exportables/gavi-aprende6.zip ./gavi-aprende6
rm -rf ./gavi-aprende6

unset REACT_APP_DEFAULT_GRADE

# open ./exportables
