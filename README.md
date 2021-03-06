<p align='center'>
    <img src='./img/jira_standups_logo.png' width=350/>
</p>

## Jira Standups

The chrome extension that helps you run more effective standup meetings, right from Jira.

### Inspiration

Almost every modern engineering org and team runs some form of a standup meeting, whether daily or otherwise, and these can be especially important in a remote-oriented work environment.

- However, Running effective standups can be something many struggle with.
- Standups can be difficult to manage consistently and stick to fixed time schedule.
- Often times one person will go way short and might not be adequately explaining their day to day, and other folks might go way over.
- With Jira Standups, the app will help you better time manage your daily standup session and ensure that each participant both voices their status and works within the specified time constraint of your choosing.
- If you're running a regularly-scheduled sprint, it can be easy for tickets to simply roll over from week to week, this app will help identify tickets that have been lingering on the board too long - and show issues in 'red' that have been stagnant on the board under a given individuals name for multiple weeks.
- Whole process is timed, so day to day you can see how long the average stand up takes and if there are opportunities to trim or improve.
- Open source

### How it works

- Chrome extension connects with a user's Jira account and pulls the active Boards and Projects from their account.
- User can select a board to run a standup from. Jira Standups will pull and categorize the issues from the board, as well as identify the engineers/users currently working on issues.
- Jira Standups generates a random order of participants based on the issues and time each participant to fit into a scheduled time window of your choosing (for example, a 15 minute standup with 3 participants would give each member 5 minutes to talk about their status with the team).
- Once complete, the extension will show the duration that the overall standup session took. Compare week to week to see how your standup efficiency improves.

### Future work

- More configurable options and week-to-week tracking for running the standup sessions.
- Ability to open window showing the issues at hand without leaving the extension.
- Paid options and premium content.

### Downloading the extension.

Go to the `extension` folder and view the instructions there.

### Dev Notes

https://developer.atlassian.com/cloud/jira/software/rest/

Atlassian Connect App using Express