"use client";
import MatchList from "@/components/Matching/MatchList";

export default function MatchesPage() {
  return (
    <div className="container">
      <h1>Matches</h1>
      <MatchList limit={20} />
    </div>
  );
}