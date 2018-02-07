#! /usr/bin/env bash

npm run lint
npm test

printf "\n\nPlease fill out the PR template.\n"
printf "The style guide for this branch will be viewable at:\n\thttps://rawgit.com/fanappics/buoy/$(git branch | awk '/\*/ {print $2}')/docs/index.html\n\n"
