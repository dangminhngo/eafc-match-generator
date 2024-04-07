import React from "react";
import { randomArrElem } from "~/lib/helpers";
import type { Team } from "~/types";

export function useTeams(selectableTeams: Team[]) {
  const [[teamAName, teamBName], setTeams] = React.useState<string[]>(["", ""]);
  const [isLoading, setLoading] = React.useState(false);

  function generate() {
    setLoading(true);
    const teamA = randomArrElem(selectableTeams);
    let teamB = randomArrElem(selectableTeams);
    while (teamA.name === teamB.name) {
      teamB = randomArrElem(selectableTeams);
    }
    setTeams([teamA.name, teamB.name]);
    setLoading(false);
  }

  return {
    teamA: selectableTeams.find((t) => t.name === teamAName),
    teamB: selectableTeams.find((t) => t.name === teamBName),
    isLoading,
    generate,
  };
}
