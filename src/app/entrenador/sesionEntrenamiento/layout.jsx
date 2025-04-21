import { ThemeProvider } from "./context/ThemeProvider";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <html lang="es">
        <body className="flex">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex justify-center items-center h-screen">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
