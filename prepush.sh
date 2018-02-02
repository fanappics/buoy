#! /usr/bin/env bash

echo "Please fill out the PR template."
echo "The style guide for this branch will be viewable at: https://rawgit.com/fanappics/buoy/$(git branch | awk '/\*/ {print $2}')/docs/index.html"
npm run lint
npm test
