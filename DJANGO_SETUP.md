# Django Backend Setup Instructions

## Current Status
- ✅ React frontend is working with fallback data
- ⚠️ Django backend needs to be started for full functionality

## To Enable Django Backend:

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Create and Apply Migrations
```bash
cd djangopro
python manage.py makemigrations portfolio
python manage.py migrate
```

### 3. Load Sample Data
```bash
python manage.py loaddata portfolio/fixtures/initial_data.json
```

### 4. Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### 5. Start Django Server
```bash
python manage.py runserver 8000
```

## API Endpoints Available:
- `GET /api/skills/` - List all skills
- `GET /api/experiences/` - List all experiences  
- `GET /api/projects/` - List all projects
- `GET /api/contact-info/` - Get contact information
- `GET /api/about-info/` - Get about section data
- `POST /api/contact-message/` - Submit contact form

## Admin Panel:
- Access: `http://localhost:8000/admin/`
- Manage all portfolio content through Django admin

## Notes:
- React app currently uses fallback data when Django is not running
- All data can be managed through Django admin once backend is set up
- CORS is configured to allow React frontend access
