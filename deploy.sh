#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Script requires build message..."
    exit 1
fi
MESSAGE=$1

echo "Bumping Version in bower.json and package.json"
version=`grep version bower.json | awk -F '"' {'print $4'}`
a=( ${version//./ } )                   # replace points, split into array
((a[2]++))                              # increment revision (or other part)
newversion="${a[0]}.${a[1]}.${a[2]}"       # compose new version
echo $version " -> " $newversion
sed -i -e "3s/$version/$newversion/" bower.json
sed -i -e "3s/$version/$newversion/" package.json

grunt production
git add .
git commit -m '$MESSAGE'

git push

echo "Version " $newversion " published to GitHub."
