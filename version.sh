#!/bin/bash

# author pappercup
# 2018年9月17日14:02:02


echo -e "\033[32m |-------------------------------------------------------------------------| \033[0m"
echo -e "\033[32m |       please input a release version number! (must start with v)        | \033[0m"
echo -e "\033[32m |                           example:                                      | \033[0m"
echo -e "\033[32m |                           v1.00.12                                      | \033[0m"
echo -e "\033[32m |-------------------------------------------------------------------------| \033[0m"
echo ""

read -p "current version is:" version

read -p "number of a few times before is:" commit_times

echo "" >> version.txt

echo $version"  "`date "+%Y-%m-%d %H:%M:%S"` >> version.txt

echo "    ●修复问题" >> version.txt

commit_log=`git log -$commit_times --no-merges --pretty=format:"%s" | awk '{print "    "NR"、"$0}'`

echo -e "$commit_log" >> version.txt

echo "" >> version.txt

echo ""

echo -e "\033[32m done \033[0m"

