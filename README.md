Tech Stack Used:
1. Python (Django) 
2. JavaScript
3. HTML, CSS

Installation Instructions:
1. In the parent folder create virtual environment. 
- python3 -m venv env
- source env/bin/activate
2. Install the dependencies.
- python -m pip install -r requirements.txt
3. Create Database
- python manage.py makemigrations
- python manage.py migrate
4. Run server
- python manage.py runserver
- URL(http://localhost:port/task/home/)

Features:
1. Login/Signup Module.
2. User can create/edit/delete task, assign priority, assign deadline, mark it as complete/incomplete. 
3. Tasks will be categorized into upcoming/overdue/today.
4. Buckets can be created and tasks can be assigned to buckets.
5. API based, have enryption decryption while making API calls. 
6. Frontend and backend validations done. 
7. Exception handling, and error loggers implemented. 
