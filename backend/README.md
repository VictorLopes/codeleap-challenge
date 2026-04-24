# CodeLeap Backend API

This is the backend project for the CodeLeap challenge, built using Django and Django REST Framework.

## 🚀 Getting Started

### 1. Setting Up the Virtual Environment (.venv)

The project uses a virtual environment (`.venv`) to manage dependencies in isolation. Since the `.venv` folder is already present in the project, follow the steps below to activate it:

**On Linux/macOS:**
```bash
source .venv/bin/activate
```

**On Windows:**
```bash
.venv\Scripts\activate
```

*Once activated, you will see `(.venv)` at the beginning of your terminal prompt.*

### 2. Installing Dependencies

With the virtual environment active, install the required packages:

```bash
pip install -r requirements.txt
```

### 3. Running Migrations

Prepare the database (SQLite):

```bash
python manage.py migrate
```

### 4. Running the Server

Start the development server:

```bash
python manage.py runserver
```

The server will be available at: `http://127.0.0.1:8000/`

---

## 🛣️ API Endpoints

The main endpoint of the application is `/careers/`.

### **Careers (`/careers/`)**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/careers/` | Lists all careers (ordered by creation date descending). |
| **POST** | `/careers/` | Creates a new career. |
| **PATCH** | `/careers/{id}/` | Partially updates an existing career. |
| **DELETE** | `/careers/{id}/` | Removes a career. |

#### **Example Request Body (POST):**
```json
{
  "username": "victor",
  "title": "My first post",
  "content": "Hello world! This is the post content."
}
```

*Note: The `author_ip` field is automatically captured by the server if not provided.*