// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  appName: 'QuizVideo',
  envName: 'dev',
  production: true,
  apiUrl: 'https://apidev.quizvideo.com',
  baseUrl: 'https://dev.quizvideo.com',
  socketUrl: 'https://gamedev.quizvideo.com',
  profileTimerStarts: 300000,
  quizTimerStarts: 180000,
  showButtonTimerStarts: 0,
  initialSyncTime: 5000,
  hideReportTime: 5000
};
