#!/bin/bash
npm run build
scp -r ./dist valentina@89.169.176.215:/home/valentina/film-react-nest/backend/
ssh valentina@89.169.176.215 << EOF
export PATH=/home/valentina/.nvm/versions/node/v24.16.0/bin:\$PATH
pm2 restart film-backend
EOF
