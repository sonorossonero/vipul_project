import React, { useState, useEffect } from "react";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import TableContent from "../TableContent";

export default function FilteringPanel(props) {
  const [filteredItems , setfilteredItems ] = useState([]);
  const [sortSettings, setSortSettings] = useState({ asc: null, desc: null });
  const items = props.items;
  const status = props.status;
  const filterByRisk = props.filterByRisk;
  const filterByReason = props.filterByReason;
  const searchBy = props.searchBy;

  useEffect(() => {
    let filteredData = items;

    if (status === 'pending') {
      filteredData = filteredData.filter((item) => !item.completed);
    } else {
      filteredData = filteredData.filter((item) => item.completed);
    }

    if (filterByRisk !== '') {
      filteredData = filteredData.filter((item) => item.riskLevel.toLowerCase() === filterByRisk);
    }

    if (filterByReason !== '') {
      filteredData = filteredData.filter((item) => {
        const reason = item.triggerReason || item.actionReason;
        return reason.toLowerCase() === filterByReason;
      });
    }

    if (searchBy !== '') {
      filteredData = filteredData.filter((item) => item.name.toLowerCase().includes(searchBy.toLowerCase()));
    }

    setfilteredItems ([...filteredData]);
  }, [items, status, filterByRisk, filterByReason, searchBy]);

  const sortData = (sortBy) => {
    const newSortSettings = { asc: null, desc: null };
    const sorted = [...filteredItems ];

    switch (sortBy) {
      case "Risk Level":
        const riskOrder = { High: 1, Medium: 2, Low: 3 };
        if (sortSettings.asc !== "Risk Level") {
          sorted.sort((a, b) =>
            riskOrder[a.riskLevel] > riskOrder[b.riskLevel] ? 1 : -1
          );
          newSortSettings.asc = "Risk Level";
        } else {
          sorted.sort((a, b) =>
            riskOrder[a.riskLevel] < riskOrder[b.riskLevel] ? 1 : -1
          );
          newSortSettings.desc = "Risk Level";
        }
        break;
      case "In queue for":
        if (sortSettings.asc !== "In queue for") {
          sorted.sort((a, b) => b.inQueueFor.localeCompare(a.inQueueFor));
          newSortSettings.asc = "In queue for";
        } else {
          sorted.sort((a, b) => a.inQueueFor.localeCompare(b.inQueueFor));
          newSortSettings.desc = "In queue for";
        }
        break;
      case "Date added on":
        if (sortSettings.asc !== "Date added on") {
          sorted.sort(
            (a, b) => new Date(b.dateAddedOn) - new Date(a.dateAddedOn)
          );
          newSortSettings.asc = "Date added on";
        } else {
          sorted.sort(
            (a, b) => new Date(a.dateAddedOn) - new Date(b.dateAddedOn)
          );
          newSortSettings.desc = "Date added on";
        }
        break;
      case "Time to Close":
        if (sortSettings.asc !== "Time to Close") {
          sorted.sort(
            (a, b) => parseInt(b.timeToClose) - parseInt(a.timeToClose)
          );
          newSortSettings.asc = "Time to Close";
        } else {
          sorted.sort(
            (a, b) => parseInt(a.timeToClose) - parseInt(b.timeToClose)
          );
          newSortSettings.desc = "Time to Close";
        }
        break;
      default:
        break;
    }

    setfilteredItems ([...sorted]);
    setSortSettings(newSortSettings);
  };

  const headers = [
    "User",
    "Risk Level",
    status === "pending" ? "Trigger Reason" : "Action Reason",
    status === "pending" ? "In queue for" : "Time to Close",
    "Date added on",
    status === "pending" ? "Previously Reviewed" : "Action Taken By",
  ];

  return (
    <div className='FilteringPanel'>
      <div className='heading'>
        {headers.map((header, idx) => (
          <div style={{ display: "flex", gap: "0.3rem" }} key={idx}>
            {header}
            {[
              "Risk Level",
              "In queue for",
              "Date added on",
              "Time to Close",
            ].includes(header) && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FontAwesomeIcon
                  icon={faAngleUp}
                  size="xs"
                  onClick={() => sortData(header)}
                  style={{ color: sortSettings.asc === header && "grey" }}
                />
                <FontAwesomeIcon
                  icon={faAngleDown}
                  size="xs"
                  onClick={() => sortData(header)}
                  style={{ color: sortSettings.desc === header && "grey" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='content'>
        {filteredItems.map((item, idx) => (
          <TableContent items={item} key={idx} />
        ))}
      </div>
    </div>
  );
}
