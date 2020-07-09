import JiraClient from "jira-connector";

let jira = {};

export const initJira = ({ domain, email, token }) => {
  jira = new JiraClient({
    host: domain,
    strictSSL: false,
    basic_auth: {
      email,
      api_token: token,
    },
  });
};

export const formatDate = (d) => {
  const dt = new Date(d);
  return `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`;
};

export const groupIssues = (issues) => {
  const issueMap = {};
  issues.forEach((issue) => {
    let { assignee } = issue.fields;
    if (assignee) {
      assignee = assignee.displayName;
      if (!issueMap.hasOwnProperty(assignee)) {
        issueMap[assignee] = [];
      }
      issueMap[assignee].push(issue);
    }
  });
  return issueMap;
};

export const getJira = () => jira;

export const getColorForAge = (days) => {
  if (days > 14) {
    return "red";
  } else if (days > 7) {
    return "orange";
  } else {
    return "green";
  }
};

export const sortRandom = (arr) => {
  return arr.sort(function (a, b) {
    return 0.5 - Math.random();
  });
};

export const getDaysOld = (oldDate) => {
  const date1 = new Date(oldDate);
  const date2 = new Date();
  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  return parseInt(Difference_In_Days);
};
