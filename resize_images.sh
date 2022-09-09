#!/bin/bash

# This script scales down the cover image from each blog post

scaledown () {
  NECESSARY=`identify -ping -format '%[fx:(h>2000 || w>2000)]\n' $1 | head -n 1`
  if [ $NECESSARY == '1' ]; then
    echo RESIZING $1;
    cp $1 $1.orig
    mogrify -resize "2000x2000>" $1
  else
    echo SKIPPING for $1
  fi
}

export -f scaledown

while getopts "h?vd:" opt; do
    case "$opt" in
    h|\?)
        echo Usage: $0 [-d dir]
        echo Scales down the header images in src/pages/markdown/ directory which are wider or taller than 2000px
        echo Alternative: -d dir  -- scales down all png / jpeg / jpg / gif files in the given directory
        exit 0
        ;;
    v)  verbose=1
        ;;
    d)  DIRECTORY=$OPTARG
        ;;
    esac
done

if [ $DIRECTORY ]; then
    echo "Scaling down ALL images in $DIRECTORY ... (skipping .orig files)"
    find $DIRECTORY -name '*' -exec file {} \; | grep image | awk '{print$1}' | sed 's/:$//' | grep -v '\.orig$' | xargs -n 1 -I {} bash -c 'scaledown "{}"'
else
    echo Scaling down header images in all src/pages/markdown/ ...
    grep -r '^image:.*$' ./src/pages/markdown | sed -e 's/\(.*\)index.md:image: \(.*\)/\1\2/' | xargs -n 1 -I {} bash -c 'scaledown "{}"'
fi
