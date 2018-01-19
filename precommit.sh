src_change=$(git diff --name-only --cached | grep '.*src/.*' | wc -l)
doc_change=$(git diff --name-only --cached | grep '.*docs/.*' | wc -l)
if [ "$src_change" > 0 ] & [ "$doc_change" == 0 ]
then
    echo "REBUILD THE STYLEGUIDE, YOU SAVAGE"
    exit 1
fi
