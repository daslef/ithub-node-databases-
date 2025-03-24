# Node + Databases

### Assignment

- в ветке with-driver
  - вывести топ-5 стран, представляемых респондентами;
  - вывести количество и процент респондентов;

- в ветке with-query-builder либо with-query-builder-introspection
  - вывести процент респондентов, исходя из ответов которых физическому здоровью в компании уделяется больше внимания, чем ментальному;
  - вывести топ-20 самых частотных слов по дополнительным заметкам и комментариям (вопрос 90);

- в ветке with-prisma
  - вывести процент респондентов с ментальными расстройствами среди работающих на удаленке и в офисе;
  - вывести процент самозанятых респондентов в возрасте до 18 лет;

### Development Workflow

Use these essential commands to accelerate your development experience:

| Command                 | Action                              |
| ----------------------- | ----------------------------------- |
| `npm run dev`           | Start dev server with file watching |
| `npm run dev:test`      | Start test suite with file watching |
| `npm run check`         | Verify code formatting & lint rules |
| `npm run fix`           | Auto-fix formatting & lint issues   |
| `npm run format`        | Format code without lint fixes      |
| `npm run test`          | Execute test suite                  |
| `npm run test:coverage` | Generate test coverage reports      |
| `npm run build`         | Create production build             |
| `npm run start`         | Start optimized production server   |

### Project Structure

```tree
my-app/
│
├── src/               # Source code
│   ├── index.ts       # Entry point
│   └── index.test.ts  # Entry point test
│
├── .env               # Environment variables
│
├── build/             # Compiled output
│
├── .vscode/           # Editor settings
├── biome.json         # Biome configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vitest configuration
```

### Editor Integration

VS Code will automatically recommend [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) for linting and formatting.

> **Powered by Fresh**
> If this turbo stack helps accelerate your development, consider showing your support with a ⭐ on [Fresh]!

[Fresh]: https://github.com/mislam/fresh
[Node.js]: https://nodejs.org/
[TypeScript]: https://www.typescriptlang.org/
[Biome]: https://biomejs.dev/
[Vitest]: https://vitest.dev/

[nodejs-badge]: https://img.shields.io/badge/Node.js-000000?style=flat-square&logo=node.js&logoColor=5CAA47
[ts-badge]: https://img.shields.io/badge/TypeScript-000000?style=flat-square&logo=typescript&logoColor=3178C6
[biome-badge]: https://img.shields.io/badge/Biome-000000?style=flat-square&logo=biome&logoColor=5FA5FA
[vitest-badge]: https://img.shields.io/badge/Vitest-000000?style=flat-square&logo=vitest&logoColor=739C1C
[mit-badge]: https://img.shields.io/badge/License-MIT-000000?style=flat-square&logoColor=white
