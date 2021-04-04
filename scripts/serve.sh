#!/bin/sh

# tsc --watch functions-src/* --outDir ./functions
tsc functions-src/* --outDir ./functions
vue-cli-service serve