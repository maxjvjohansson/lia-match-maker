import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {}
        },
        remove(name, options) {
          try {
            cookieStore.delete(name, options);
          } catch (error) {}
        },
      },
    }
  );

  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return Response.json(
        { error: "Du måste vara inloggad." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const adminSupabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            try {
              cookieStore.set(name, value, options);
            } catch (error) {}
          },
          remove(name, options) {
            try {
              cookieStore.delete(name, options);
            } catch (error) {}
          },
        },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { error } = await adminSupabase.auth.admin.deleteUser(userId);

    if (error) {
      console.error("Delete user error:", error.message);
      return Response.json(
        { error: `Kunde inte radera användare: ${error.message}` },
        { status: 500 }
      );
    }

    return Response.json({ message: "Konto raderat" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return Response.json(
      { error: `Ett oväntat fel uppstod: ${error.message}` },
      { status: 500 }
    );
  }
}
