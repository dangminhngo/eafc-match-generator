"use client";

import React from "react";
import TeamCard from "./team-card";
import Select from "~/components/select";
import { teams } from "~/lib/teams";
import type { Team } from "~/types";
import { useTeams } from "~/hooks/useTeams";

const starOptions = [3, 3.5, 4, 4.5, 5].map((x) => ({
  value: x + "",
  label: x + "",
}));

export default function MainApp() {
  const [mounted, setMounted] = React.useState(false);
  const [type, setType] = React.useState("Club");
  const [min, setMin] = React.useState("3");
  const [max, setMax] = React.useState("4.5");

  const selectableTeams = React.useMemo<Team[]>(
    () =>
      teams[type == "Club" ? "clubs" : "nations"].filter(
        (t) => t.stars >= +min && t.stars <= +max,
      ),
    [type, min, max],
  );

  const { teamA, teamB, isLoading, generate } = useTeams(selectableTeams);

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
          <Select
            id="type"
            label="Type"
            options={["Team", "Nation"].map((x) => ({ value: x, label: x }))}
            value={type}
            setValue={setType}
          />
          <Select
            id="min"
            label="Min."
            options={starOptions}
            disabledOptions={starOptions
              .filter((opt) => opt.value > max)
              .map((opt) => opt.value)}
            value={min}
            setValue={setMin}
          />
          <Select
            id="max"
            label="Max."
            options={starOptions}
            disabledOptions={starOptions
              .filter((opt) => opt.value < min)
              .map((opt) => opt.value)}
            value={max}
            setValue={setMax}
          />
        </div>
        <button
          className="flex h-10 items-center justify-center rounded bg-slate-700 px-6 font-semibold text-slate-100 shadow"
          onClick={generate}
        >
          Generate
        </button>
      </div>
      <div className="flex h-[300px] items-center justify-center rounded-lg border-2 border-slate-700 bg-slate-800">
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
