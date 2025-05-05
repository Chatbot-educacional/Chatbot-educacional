# PocketBase Guide

## Overview

PocketBase is used in CoderBot v2 for authentication, database, and real-time features. This guide covers the setup, configuration, and database schema.

## Installation

1. Download PocketBase for your platform from [pocketbase.io](https://pocketbase.io/docs/)
2. Extract the downloaded file
3. Run PocketBase:
   ```bash
   # Windows
   .\pocketbase.exe serve

   # Linux/macOS
   ./pocketbase serve
   ```
4. Access the admin UI at `http://127.0.0.1:8090/_/`
5. Create your first admin account

## Database Schema

### Collections

#### 1. Users
```json
{
  "name": "users",
  "type": "auth",
  "schema": [
    {
      "name": "username",
      "type": "text",
      "required": true,
      "unique": true
    },
    {
      "name": "email",
      "type": "email",
      "required": true,
      "unique": true
    },
    {
      "name": "role",
      "type": "select",
      "options": ["student", "teacher", "admin"],
      "required": true
    },
    {
      "name": "learning_style",
      "type": "select",
      "options": ["visual", "auditory", "reading", "kinesthetic"],
      "required": false
    },
    {
      "name": "preferred_languages",
      "type": "select",
      "options": ["python", "javascript", "java", "c++"],
      "multiple": true,
      "required": false
    }
  ]
}
```

#### 2. Exercises
```json
{
  "name": "exercises",
  "type": "base",
  "schema": [
    {
      "name": "title",
      "type": "text",
      "required": true
    },
    {
      "name": "description",
      "type": "text",
      "required": true
    },
    {
      "name": "difficulty",
      "type": "select",
      "options": ["beginner", "intermediate", "advanced"],
      "required": true
    },
    {
      "name": "language",
      "type": "select",
      "options": ["python", "javascript", "java", "c++"],
      "required": true
    },
    {
      "name": "test_cases",
      "type": "json",
      "required": true
    },
    {
      "name": "solution",
      "type": "text",
      "required": true
    },
    {
      "name": "hints",
      "type": "json",
      "required": false
    }
  ]
}
```

#### 3. Progress
```json
{
  "name": "progress",
  "type": "base",
  "schema": [
    {
      "name": "user",
      "type": "relation",
      "required": true,
      "options": {
        "collectionId": "users",
        "cascadeDelete": true
      }
    },
    {
      "name": "exercise",
      "type": "relation",
      "required": true,
      "options": {
        "collectionId": "exercises",
        "cascadeDelete": true
      }
    },
    {
      "name": "status",
      "type": "select",
      "options": ["not_started", "in_progress", "completed"],
      "required": true
    },
    {
      "name": "attempts",
      "type": "number",
      "required": true,
      "min": 0
    },
    {
      "name": "last_attempt",
      "type": "date",
      "required": false
    },
    {
      "name": "score",
      "type": "number",
      "required": false,
      "min": 0,
      "max": 100
    }
  ]
}
```

#### 4. Feedback
```json
{
  "name": "feedback",
  "type": "base",
  "schema": [
    {
      "name": "user",
      "type": "relation",
      "required": true,
      "options": {
        "collectionId": "users",
        "cascadeDelete": true
      }
    },
    {
      "name": "exercise",
      "type": "relation",
      "required": true,
      "options": {
        "collectionId": "exercises",
        "cascadeDelete": true
      }
    },
    {
      "name": "code",
      "type": "text",
      "required": true
    },
    {
      "name": "ai_feedback",
      "type": "text",
      "required": true
    },
    {
      "name": "suggestions",
      "type": "json",
      "required": false
    },
    {
      "name": "created",
      "type": "date",
      "required": true
    }
  ]
}
```

#### 5. Learning Paths
```json
{
  "name": "learning_paths",
  "type": "base",
  "schema": [
    {
      "name": "title",
      "type": "text",
      "required": true
    },
    {
      "name": "description",
      "type": "text",
      "required": true
    },
    {
      "name": "difficulty",
      "type": "select",
      "options": ["beginner", "intermediate", "advanced"],
      "required": true
    },
    {
      "name": "exercises",
      "type": "relation",
      "multiple": true,
      "required": true,
      "options": {
        "collectionId": "exercises",
        "cascadeDelete": false
      }
    },
    {
      "name": "prerequisites",
      "type": "relation",
      "multiple": true,
      "required": false,
      "options": {
        "collectionId": "learning_paths",
        "cascadeDelete": false
      }
    }
  ]
}
```

## 📦 PocketBase Setup for Gamification

### 1. Collection: `actions`
**Description:** Defines each possible gamification action and how many points it grants.

| Field       | Type     | Required | Description                                      |
|-------------|----------|----------|--------------------------------------------------|
| name        | string   | yes      | Unique action name (e.g., `whiteboard_save_board`) |
| description | string   | no       | Human-readable description of the action         |
| points      | number   | yes      | Points/XP granted for this action                |
| multiplier  | number   | no       | XP multiplier (optional)                         |
| badge       | string   | no       | Badge granted (optional)                         |
| context     | string   | no       | Special context (optional)                       |

**Example records:**
- `whiteboard_save_board` — 10 points
- `whiteboard_create_board` — 50 points
- `whiteboard_open_board` — 20 points
- `whiteboard_upload_file` — 30 points
- `whiteboard_daily_bonus` — 200 points
- `whiteboard_10_boards` — 500 points
- `access_excalidraw` — 100 points

---

### 2. Collection: `user_actions`
**Description:** History of actions performed by each user.

| Field     | Type     | Required | Description                        |
|-----------|----------|----------|------------------------------------|
| user      | relation | yes      | Relates to the `users` collection  |
| action    | string   | yes      | Action name (should match `actions.name`) |
| context   | string   | no       | Special context (optional)         |
| timestamp | date     | yes      | Date/time of the action            |

---

### 3. Collection: `gamification`
**Description:** Current gamification state for the user (XP, level, badges, etc).

| Field     | Type     | Required | Description                        |
|-----------|----------|----------|------------------------------------|
| user      | relation | yes      | Relates to the `users` collection  |
| points    | number   | yes      | Accumulated points/XP              |
| level     | number   | yes      | Current level                      |
| badges    | list     | no       | List of badges/achievements        |

---

### 4. (Optional) Collection: `badges`
**Description:** List of all possible badges, if you want custom badges.

| Field       | Type     | Required | Description                        |
|-------------|----------|----------|------------------------------------|
| name        | string   | yes      | Badge name                         |
| icon        | file     | no       | Badge icon                         |
| description | string   | no       | Badge description                  |

---

## 📋 Notes

- Make sure the action names in `actions` match those used in the frontend (`registerUserAction`).
- The `user` field in collections should be of type **relation** to the `users` collection.
- The `timestamp` field in `user_actions` can be of type **date** or **text** (ISO string).

## Real-time Features

PocketBase provides real-time subscriptions that we use for:

1. Live code feedback
2. Progress updates
3. Collaborative features
4. Teacher monitoring

Example subscription:
```typescript
// Subscribe to user progress updates
pb.collection('progress').subscribe('*', function(e) {
  console.log(e.record);
});
```

## Security Rules

### Users Collection
```javascript
// Only allow users to read their own data
if (auth.id != record.id) {
  return false;
}
```

### Exercises Collection
```javascript
// Allow read access to all authenticated users
if (auth) {
  return true;
}
```

### Progress Collection
```javascript
// Users can only read their own progress
if (auth.id != record.user) {
  return false;
}
```

## Backup and Migration

1. Regular backups:
   ```bash
   # Export data
   pocketbase export --dir ./pb_backup
   
   # Import data
   pocketbase import --dir ./pb_backup
   ```

2. Database migrations are stored in `frontend/pocketbase/migrations/`

## Best Practices

1. Always use relations for data integrity
2. Implement proper security rules
3. Use real-time subscriptions for live features
4. Regular backups
5. Version control your schema changes

## Troubleshooting

Common issues and solutions:

1. **Connection Issues**
   - Check if PocketBase is running
   - Verify the port (default: 8090)
   - Check firewall settings

2. **Authentication Problems**
   - Verify user credentials
   - Check security rules
   - Clear browser cache

3. **Real-time Issues**
   - Check WebSocket connection
   - Verify subscription rules
   - Monitor server logs

## Additional Resources

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [API Reference](https://pocketbase.io/docs/api-records/)
- [Security Rules](https://pocketbase.io/docs/security-rules/)
- [Real-time Subscriptions](https://pocketbase.io/docs/subscriptions/)

## 🗂️ How to use the PocketBase migration file

### Exporting the current schema
1. Access the PocketBase admin panel.
2. Go to **Settings > Export Data**.
3. Export the desired collections (actions, user_actions, gamification, badges, users, etc).
4. Save the exported `.json` file in the `src/integrations/pocketbase/` folder of the project (e.g., `collections_migration.json`).

### Importing the schema in another environment
1. In the new environment, access the PocketBase admin panel.
2. Go to **Settings > Import Data**.
3. Select the `collections_migration.json` file and import it.
4. Done! The schema (and data, if exported) will be replicated.

### Team tip
- Whenever you change the database schema, export it again and update the file in the repository.
- Document this process in the README or Wiki so everyone knows how to import/export.

### Automation (optional)
- For larger teams, you can use the [PocketBase REST API](https://pocketbase.io/docs/api-collections/) to import/export collections via script. 