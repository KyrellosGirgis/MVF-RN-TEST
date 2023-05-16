#!/bin/bash

stringifiedKeys=$(node scripts/secretKeys/format-secret-keys.js keys.json )

cd android
./gradlew hideSecret -Pkey="$stringifiedKeys"  -PkeyName=StringifiedKeys -Ppackage=com.hidesecrets

