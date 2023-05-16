#!/bin/bash

stringifiedKeys=$(node scripts/secretKeys/format-secret-keys.js keys.json)

cd ios 
pod keys set 'stringifiedKeys' "$stringifiedKeys"
