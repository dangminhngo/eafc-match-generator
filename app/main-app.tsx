"use client";

import React from "react";
import TeamCard from "./team-card";
import { teams } from "~/lib/teams";
import type { Team } from "~/types";
import { useTeams } from "~/hooks/useTeams";

export default function MainApp() {
  const [mounted, setMounted] = React.useState(false);
  const [type, setType] = React.useState("club");
  const [min, setMin] = React.useState(3);
  const [max, setMax] = React.useState(5);

  const selectableTeams = React.useMemo<Team[]>(
    () =>
      teams[type === "club" ? "clubs" : "nations"].filter(
        (t) => t.stars >= +min && t.stars <= +max,
      ),
    [type, min, max],
  );

  const { teamA, teamB, generate } = useTeams(selectableTeams);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <div className="container mx-auto space-y-4">
      <h1 className="text-center text-2xl font-bold">
        EAFC 24 Match Generator
      </h1>
      <div className="flex flex-col items-stretch space-y-2">
        <div className="grid grid-cols-3 space-x-2">
          <div className="flex flex-col items-stretch space-y-1">
            <label>Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded border border-slate-600 bg-white px-4 py-2"
            >
              <option value="club">Club</option>
              <option value="nation">Nation</option>
            </select>
          </div>
          <div className="flex flex-col items-stretch space-y-1">
            <label>Min.</label>
            <select
              value={min}
              onChange={(e) => setMin(+e.target.value)}
              className="rounded border border-slate-600 bg-white px-4 py-2"
            >
              <option value={3}>3</option>
              <option value={3.5}>3.5</option>
              <option value={4}>4</option>
              <option value={4.5}>4.5</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="flex flex-col items-stretch space-y-1">
            <label>Max.</label>
            <select
              value={max}
              onChange={(e) => setMax(+e.target.value)}
              className="rounded border border-slate-600 bg-white px-4 py-2"
            >
              <option value={3}>3</option>
              <option value={3.5}>3.5</option>
              <option value={4}>4</option>
              <option value={4.5}>4.5</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>
        <button
          className="flex h-10 items-center justify-center rounded bg-slate-800 px-6 font-semibold text-slate-100 shadow"
          onClick={generate}
        >
          Generate
        </button>
      </div>
      <div className="flex h-[300px] items-center justify-center rounded-lg border-2 border-slate-200">
        {teamA && teamB ? (
          <div className="flex items-center justify-center space-x-16">
            <TeamCard
              {...teamA}
              logo={`/logos/${type.toLowerCase() + "s"}/${teamA.logo}`}
            />
            <div className="text-3xl font-bold text-slate-500">VS</div>
            <TeamCard
              {...teamB}
              logo={`/logos/${type.toLowerCase() + "s"}/${teamB.logo}`}
            />
          </div>
        ) : (
          <p>Click &quot;Generate&quot; to create match...</p>
        )}
      </div>
    </div>
  ) : null;
}
