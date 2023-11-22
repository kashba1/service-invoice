#!/bin/sh

# Author : Anshul Verma
# Copyright (c) bNoise App Backend
# Script follows here:

echo "Enter your messageass"
read message
git add .
git commit -m"${message}"
git status
echo "Enter your Branch Name!!!"
branchname=$(git describe --contains --all HEAD)
echo "${branchname}"
# read branch_name
git push origin "${branchname}"
