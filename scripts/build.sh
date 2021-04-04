#!/bin/sh

rm -rf ./functions
tsc functions-src/* --outDir ./functions
vue-cli-service build