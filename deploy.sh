#!/bin/bash

echo "Bump Version in Bower.json"

grunt production
git add .
git commit -m "Improved Responsiveness."

git push

