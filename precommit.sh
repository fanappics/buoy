# Check if components were changed
src_change=`git diff --name-only --cached | grep '.*src/.*' | wc -l`
# Check if style guide was updated
doc_change=`git diff --name-only --cached | grep '.*docs/.*' | wc -l`

if [ "$src_change" -gt 0 ] && [ "$doc_change" -eq 0 ];
then
    echo "Remember to rebuild the style guide!"
    echo "npm run styleguide:build"
    exit 1
fi
