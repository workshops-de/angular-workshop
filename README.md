<h1 align="center">Angular & TypeScript Intensive Training</h1>

<p align="center">
  <img alt="workshops-de-logo-blue" src="docs/logo-workshops-de.png" width="120">
  <br>
  <em>The best way to get started with Angular</em>
  <br>
</p>

<p align="center">
  <a href="https://workshops.de/seminare-schulungen-kurse/angular-typescript" target="_blank"><strong>workshops.de</strong></a>
  <br>
</p>

## Local Development

| Command         | Description                                       |
| --------------- | ------------------------------------------------- |
| `npm install`   | Installs the packages to develop the Angular app  |
| `npm start`     | Starts the Angular app                            |
| `npm test`      | Runs tests for the Angular app                    |
| `npm run build` | Compiles the Angular app in production mode       |
| `npm run lint`  | Runs static code analysis using [eslint][eslint]. |

## The API

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `npx bookmonkey-api` | Installs and starts the HTTP API "Bookmonkey API" |

The API provides fake data that you can use in your Angular application.

> [!NOTE]
> The API starts at http://localhost:4730.
> When you open this page, you'll find documentation for all endpoints. 🚀

## AI Tutor (Beta)

This repository includes a Modern Angular Tutor that guides you step-by-step through building a complete Angular application using the latest patterns in **Angular v20**.

> [!WARNING]
> The AI Tutor feature is in beta and may occasionally provide incorrect information or code examples.

### Using the AI Tutor

The AI Tutor teaches through a **Learn-Apply-Feedback** cycle:

1. Learn a concept with explanations and examples
2. Apply knowledge with hands-on exercises
3. Get automatic feedback on your solution

### Example Prompts

| Prompt Type       | Examples                                                        |
| ----------------- | --------------------------------------------------------------- |
| **Get Started**   | "Let's start", "Hello"                                          |
| **Adjust Level**  | "Set my experience level to beginner", "Change my rating to 8"  |
| **View Progress** | "Where are we?", "Show the table of contents"                   |
| **Skip Module**   | "Skip this section", "Auto-complete this step for me"           |
| **Jump to Topic** | "Take me to the forms lesson", "Jump to services"               |
| **Get Help**      | "I'm stuck", "Give me a hint", "Show step-by-step instructions" |

### Troubleshooting

If the tutor doesn't respond correctly:

- Type "proceed" to nudge the tutor forward
- Correct the tutor if it misunderstands your progress
- Ask "What should I see in my UI?" to verify expected output
- Reload the browser window or start a new chat session
- For persistent issues, report them on [GitHub](https://github.com/angular/ai-tutor/issues)
