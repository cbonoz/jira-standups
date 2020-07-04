// With ES6
// import JiraApi from "jira-client";
const axios = require("axios");

const domain = "https://chrisdevelop.atlassian.net";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqaXJhLXN0YW5kdXBzIiwiaWF0IjoxNTkzODczNTQyLCJzdWIiOiI1ZTJiMjk1MDgzMmQ3MzBjYTIwMWE2MGEiLCJleHAiOjE1OTM4NzQ0NDIsImF1ZCI6WyIwZDNiMzljYS03NDFjLTM0ZTktYWNkMy01MzFiZjViMTRmMGMiXSwiY29udGV4dCI6e319.UAwB_49AcdldZgq1Cdzux0qU6bUK0-hpuvbfNPMZKPM";
// Initialize

const url = `${domain}/rest/agile/1.0/board`;
const data = axios
  .get(url, {
    headers: { Authorization: "Bearer " + token },
  })
  .then((boards) => {
    console.log("boards", boards);
  });
