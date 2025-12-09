import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-heading font-bold text-primary-700">
          ShopVerse
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover. Shop. Repeat.
        </p>
        <p className="text-sm text-muted-foreground">
          🚧 Under Construction - Step 1 Complete
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary-50 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}