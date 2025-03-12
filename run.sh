#!/bin/bash

# Navigate to backend directory and start Laravel server
cd edu-souq-be || exit
php artisan serve &

# Navigate back to root and then to frontend directory
cd ..
cd edu-souq-fe || exit
npm run dev