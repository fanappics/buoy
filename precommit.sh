# Check if components were changed
src_change=`git diff --name-only --cached | grep '.*src/.*' | wc -l`
# Check if style guide was updated
doc_change=`git diff --name-only --cached | grep '.*docs/.*' | wc -l`

if [ "$src_change" -gt 0 ] && [ "$doc_change" == 0 ];
then
    echo "Remember to rebuild the style guide"
    exit 1
fi
