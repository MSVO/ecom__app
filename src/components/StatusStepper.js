import { Step, StepLabel, Stepper } from "@material-ui/core";
import { Fragment } from "react";

function StatusStepper(props) {
  const { status } = props;

  const pieces = {
    placed: {
      label: "Placed",
      completed: true,
      key: "Placed",
      error: false,
    },
    acceptPending: {
      label: "Accept Pending",
      completed: false,
      key: "accept-pending",
      error: false,
    },
    accepted: {
      label: "Accepted",
      completed: true,
      error: false,
      key: "accepted",
    },
    rejected: {
      label: "Rejected",
      completed: true,
      error: true,
      key: "rejected",
    },
  };

  function makeStep(properties) {
    const { key, completed, label, error } = properties;
    return (
      <Step key={key} completed={completed}>
        <StepLabel error={error}>{label}</StepLabel>
      </Step>
    );
  }

  function makeSteps(status) {
    const { placed, acceptPending, accepted, rejected } = pieces;
    switch (status) {
      case "PLACED":
        return [placed, acceptPending].map(makeStep);
      case "ACCEPTED":
        return [placed, accepted].map(makeStep);
      case "REJECTED":
        return [placed, rejected].map(makeStep);
    }
  }

  return <Stepper>{makeSteps(status)}</Stepper>;
}
export default StatusStepper;
