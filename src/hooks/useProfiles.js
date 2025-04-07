import { useState, useEffect } from "react";
import supabase from "@/utils/supabase/client";

export default function useProfiles(role) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);

        let data, error;

        if (role === "student") {
          ({ data, error } = await supabase
            .from("students")
            .select(
              "id, name, website, profession_id, user_id, profession:professions(name), technologies:student_technologies(technology_id)"
            ));
        } else if (role === "company") {
          ({ data, error } = await supabase
            .from("companies")
            .select(
              "id, name, user_id, professions:company_professions(profession_id), technologies:company_technologies(technology_id)"
            ));
        }

        if (error) throw error;

        const professionIds = Array.from(
          new Set(
            data.flatMap((profile) =>
              role === "student"
                ? [profile.profession_id]
                : profile.professions.map((prof) => prof.profession_id)
            )
          )
        );

        const technologyIds = Array.from(
          new Set(
            data.flatMap((profile) =>
              profile.technologies.map((tech) => tech.technology_id)
            )
          )
        );

        const { data: professions, error: profError } = await supabase
          .from("professions")
          .select("id, name")
          .in("id", professionIds);

        if (profError) throw profError;

        const { data: technologies, error: techError } = await supabase
          .from("technologies")
          .select("id, name")
          .in("id", technologyIds);

        if (techError) throw techError;

        const profilesWithDetails = data.map((profile) => {
          const techNames = profile.technologies.map(
            (tech) =>
              technologies.find((t) => t.id === tech.technology_id)?.name
          );

          const profNames =
            role === "student"
              ? professions.find((p) => p.id === profile.profession_id)?.name
              : profile.professions.map(
                  (prof) =>
                    professions.find((p) => p.id === prof.profession_id)?.name
                );

          return {
            ...profile,
            technologies: techNames,
            profession: Array.isArray(profNames)
              ? profNames.join(", ")
              : profNames,
          };
        });

        setProfiles(profilesWithDetails);
      } catch (err) {
        console.error("Error fetching profiles:", err.message);
        setError("Kunde inte ladda profiler");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [role]);

  return { profiles, loading, error };
}
