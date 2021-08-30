#!/bin/bash

rm -rf ./exportables || true
mkdir ./exportables || true

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

unset REACT_APP_DEFAULT_GRADE

open ./exportables
