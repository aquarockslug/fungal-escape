#!/bin/zsh
# creates a zip file containing all of the files required to play the game on a web browser
setopt extendedglob; 7z u -tzip game **/^(*.zip|*.md|*.sh|biome.json)
