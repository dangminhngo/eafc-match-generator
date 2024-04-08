import Image from "next/image";
import type { Team } from "~/types";
import { getStars } from "~/lib/helpers";
import { Star, StarHalf, StarOutline } from "~/components/icons";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TeamCardProps extends Team {}

export default function TeamCard({ name, stars, logo }: TeamCardProps) {
  return (
    <div className="flex h-[200px] w-[200px] flex-col items-center space-y-3">
        <Image src={logo} alt={name} style={{ width: "auto", height: 100 }} width={100} height={100} />
      <p className="text-xl font-bold">{name}</p>
      <StarRating stars={stars} />
    </div>
  );
}

function StarRating({ stars }: { stars: number }) {
  const { full, half, none } = getStars(stars);

  return (
    <div className="flex items-center space-x-2 text-amber-500">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} />
      ))}
      {Array.from({ length: half }).map((_, i) => (
        <StarHalf key={i} />
      ))}
      {Array.from({ length: none }).map((_, i) => (
        <StarOutline key={i} />
      ))}
    </div>
  );
}
