#!/bin/bash

export GIT_REPOSITORY__URL="$GIT_REPOSITORY__URL"

# how to see files inside /home/app directory in a bin/bash script
ls -la /home/app

git clone "$GIT_REPOSITORY__URL" /home/app/output

exec node script.js