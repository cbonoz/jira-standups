import React, { Component } from "react";
import { formatDate, getColorForAge, getDaysOld } from "./helper";

function Issue({ issue, domain }) {
  const { created, summary, status, description, assignee } = issue.fields;
  const { key } = issue;
  const colorClass = getColorForAge(created);
  // status.name
  const issueUrl = `https://${domain}/browse/${key}`;

  const openInCurrentTab = (url) => {
    const { chrome } = window;
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];
        chrome.tabs.update(tab.id, { url });
      });
      return;
    }

    window.open(url, "_blank");
  };

  return (
    <div className="jira-issue centered">
      {domain && (
        <div
          href={issueUrl}
          className="div-link"
          onClick={() => openInCurrentTab(issueUrl)}
        >
          <b>{summary}</b>
        </div>
      )}
      {!domain && <b>{summary}</b>}
      {description && <p>{description}</p>}
      <br />
      {status.name.toUpperCase()}, {formatDate(created)} (
      <span className={colorClass}>{getDaysOld(created)} days old</span>)
    </div>
  );
}

export default Issue;
