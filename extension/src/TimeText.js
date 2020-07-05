import React, { Component } from "react";

export default function TimeText({ time, showTime = false }) {
  const seconds = parseInt(time % 60);
  const minutes = parseInt(time / 60);
  const hasMinutes = !!minutes;
  return (
    <span className="jira-timer">
      {hasMinutes && <span>{minutes}:</span>}
      {seconds.toString().padStart(2, "0")}
      &nbsp;{showTime && hasMinutes ? "minutes" : "seconds"}
    </span>
  );
}
