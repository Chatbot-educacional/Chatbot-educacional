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