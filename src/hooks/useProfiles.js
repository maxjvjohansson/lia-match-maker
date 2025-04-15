import { useState, useEffect, useCallback } from "react";
import supabase from "@/utils/supabase/client";

export default function useProfiles(role) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfiles = useCallback(async () => {
    if (!role) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      let data, error;

      if (role === "student") {
        ({ data, error } = await supabase.from("students").select(`
            id, 
            name,
            website,
            profession_id,
            user_id,
            technologies:student_technologies(technology_id, technology:technologies(name)),
            profession:professions(name)
          `));
      } else if (role === "company") {
        ({ data, error } = await supabase.from("companies").select(`
            id, 
            name,
            user_id,
            professions:company_professions(
              profession_id, 
              profession:professions(id, name)
            ),
            technologies:company_technologies(
              technology_id, 
              technology:technologies(id, name)
            )
          `));
      }

      if (error) throw error;

      if (data.length === 0) {
        setProfiles([]);
        return;
      }

      const userIds = data.map((profile) => profile.user_id);

      const { data: users, error: userError } = await supabase
        .from("user_profiles")
        .select("user_id, email")
        .in("user_id", userIds);

      if (userError) throw userError;

      const professionIds = Array.from(
        new Set(
          data.flatMap((profile) =>
            role === "student"
              ? [profile.profession_id]
              : profile.professions.map((prof) => prof.profession_id)
          )
        )
      );

      const { data: professions, error: profError } = await supabase
        .from("professions")
        .select("id, name")
        .in("id", professionIds);

      if (profError) throw profError;

      const technologyIds = Array.from(
        new Set(
          data.flatMap((profile) =>
            profile.technologies.map((tech) => tech.technology_id)
          )
        )
      );

      const { data: technologies, error: techError } = await supabase
        .from("technologies")
        .select("id, name")
        .in("id", technologyIds);

      if (techError) throw techError;

      const profilesWithDetails = data.map((profile) => {
        const email =
          users.find((user) => user.user_id === profile.user_id)?.email ||
          "Saknar e-post";

        const techNames = profile.technologies
          .map((tech) => tech.technology?.name)
          .filter(Boolean);

        const profNames =
          role === "student"
            ? profile.profession?.name
            : profile.professions
                .map((prof) => prof.profession?.name)
                .filter(Boolean);

        return {
          ...profile,
          email,
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
  }, [role]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return { profiles, loading, error, fetchProfiles };
}
