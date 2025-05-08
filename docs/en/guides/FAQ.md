# FAQ (Frequently Asked Questions)

## Installation

**1. What should I do if PocketBase installation fails?**
- Make sure you downloaded the correct version for your OS.
- Ensure port 8090 is free.
- Check the setup guide and ask for help on Discord.

**2. How to fix CORS errors on the backend?**
- Check backend environment variables.
- Add allowed origins correctly in the `.env` file.

**3. How to fix port already in use errors?**
- Change ports in config files or free up the occupied ports.

## Usage

**4. How do I create a new exercise?**
- Go to the PocketBase admin panel, open the `exercises` collection, and click "Create".
- Fill in the required fields: title, description, difficulty, language, test cases, and solution.

**5. How do I track student progress?**
- Use the `progress` collection in PocketBase or the tracking screens in the frontend (if available).

## Pedagogy

**6. What is Socratic mode?**
- The AI guides the student with questions, never giving direct answers, stimulating reasoning.

**7. How do worked examples work?**
- The bot presents examples similar to the student's problem, but never identical, to encourage learning by analogy.

## Integration

**8. How to integrate with external IDEs?**
- Integration with IDEs is on the roadmap. Suggestions and contributions are welcome!

**9. How to use the gamification system?**
- Make sure the `actions`, `user_actions`, and `gamification` collections are created in PocketBase.
- See the gamification guide for configuration examples.

## Common Issues

**10. I can't authenticate in PocketBase. What should I do?**
- Check your username and password.
- Review the security rules for the `users` collection.
- Clear your browser cache.

**11. The frontend can't connect to the backend.**
- Check URLs and environment variables.
- Make sure both services are running.

## Support
- See the setup and development guides.
- Check open issues on GitHub.
- Join Discord for quick questions. 