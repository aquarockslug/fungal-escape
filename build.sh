#!/bin/zsh

# the name of the file
ARCHIVE_NAME="game"

# create a zip file containing only the files required to play
setopt extendedglob && 7z u -tzip $ARCHIVE_NAME **/^(*.zip|*.md|*.sh|biome.json) | tail

# upload the zip file to itch.io
echo && butler push $ARCHIVE_NAME.zip aquarock/spore-shooter:build

sleep 10
if [ -f /bin/wsl-open ]; then wsl-open https://aquarock.itch.io/spore-shooter
elif [ -f /bin/firefox ]; then firefox https://aquarock.itch.io/spore-shooter; fi
