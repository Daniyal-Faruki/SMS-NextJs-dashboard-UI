import "../../styles/styles.scss";

// components/LoadingSplash.tsx
export default function LoadingSplash() {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-100"></div>
      </div>
    );
  }
  