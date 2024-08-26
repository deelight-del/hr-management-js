-- Create hr-management db if not exist.
SELECT 'CREATE DATABASE hr_management'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'hr-management')\gexec
