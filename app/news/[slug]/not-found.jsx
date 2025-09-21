import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-3 p-8">
			<h1 className="text-2xl font-semibold">Post not found</h1>
			<p className="text-gray-600">The article you're looking for doesn't exist.</p>
			<Link className="text-blue-600 hover:text-blue-800" href="/">Go Home</Link>
		</div>
	);
}
