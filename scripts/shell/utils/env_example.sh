#! /bin/sh
# Script to generate .env.example

# Remove the values from env vars in .env
sed -r 's/(.*\=\")(.*)(\")/\1\3/g' .env > .env.example