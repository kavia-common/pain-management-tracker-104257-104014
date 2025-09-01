#!/bin/bash
cd /home/kavia/workspace/code-generation/pain-management-tracker-104257-104014/pain_management_web
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

