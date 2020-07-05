import React, { Component } from "react";
import { formatDate, getColorForAge, getDaysOld } from "./helper";

function Issue({ issue }) {
  const { created, summary, status, description, assignee } = issue.fields;
  const colorClass = getColorForAge(created);
  // status.name
  return (
    <div className="jira-issue centered">
      <b>{summary}</b>
      {description && <p>{description}</p>}
      <br />
      {status.name.toUpperCase()}, {formatDate(created)} (
      <span className={colorClass}>{getDaysOld(created)} days old</span>)
    </div>
  );
}

export default Issue;
