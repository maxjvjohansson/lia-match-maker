import "../styles/variables.css";
import "../styles/style.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Mingla by YRGO",
  description: "Generated by create next app",
};

export default function Layout({ children }) {
  return (
    <html lang="sv">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
