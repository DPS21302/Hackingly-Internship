import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  metadataBase: new URL("https://hackingly.in"),
  title: "Hackingly",
  description: "Connecting you to your dream career",
};

export default function Layout({ children }) {
  return (
    <div className="flex h-[98vh] overflow-hidden pt-20 px-5">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full">
        {/* Top header if needed */}
        {/* <header className="w-full">Header content here</header> */}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-2">
          <div className="container mx-auto">{children}</div>
        </main>

        {/* Footer if needed */}
        {/* <footer className="w-full">Footer content here</footer> */}
      </div>
    </div>
  );
}
