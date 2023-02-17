import chalk from 'chalk';
import fs from 'fs';
import { format } from 'date-fns'
import {formatDistanceToNow, isAfter, isBefore, parse, set} from 'date-fns'
import {Command} from 'commander';
import getGitVersion from './src/getGitVersion.js'

const gitVersion = await getGitVersion()

const name = 'David Dyberg'
const startOfCourse = new Date (2023, 0, 31)
const result = formatDistanceToNow(startOfCourse)

console.log(chalk.blue(name));
console.log(format(new Date(), 'yyyy-MM-dd'));
console.log(`The course started: ${result} ago`);
console.log(`Your npm and node version is: ${process.env.npm_config_user_agent}`);
console.log(`Your current git version: ${gitVersion}`);

const content = `
Name: ${name}
npm & node: ${process.env.npm_config_user_agent}
git version: ${gitVersion}
Date: ${format(new Date(), 'yyyy-MM-dd')}
`;

await fs.promises.writeFile('index.md', content)
  .then(() => {
  })
  .catch((err) => {
    throw err;
  });

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="index.css">
  <title>Assignment2</title>
</head>
<body>
  <header>
      <h1>Assignment2</h1>
  </header>
  <main>
    <div> Name: ${name} </div>
    <div> npm & node: ${process.env.npm_config_user_agent} </div>
    <div> git version: ${gitVersion}</div>
    <div> Current date: ${format(new Date(), 'yyyy-MM-dd')} </div>
    <div> The course started: ${result} ago </div>
  </main>
</body>
</html>
`;

fs.writeFile('index.html', html, function (err) {
  if (err) throw err;
});

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

const dateStringSentAsArgument = argumentParser.args[0]
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
const currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0})

console.log('isAfter', isAfter(dateSentAsArgument, currentDate))
console.log('isBefore', isBefore(dateSentAsArgument, currentDate))