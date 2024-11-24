"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, RefreshCw } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getNewsArticles } from "@/hooks/hookNewsArticles";
import icon from "@/app/icon.png";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const pathname = usePathname();

	const navigationItems = [
		{ name: "Home", href: "/" },
		{ name: "Categories", href: "/categories" },
		{ name: "Donations", href: "/donations" },
		{ name: "About Us", href: "/about" },
		{ name: "Contant Us", href: "/contact" },
	];

	const handleDatabaseRefresh = async () => {
		try {
			setIsRefreshing(true);
			await getNewsArticles();
			// toast.success("Database refresh successful");
		} catch (error) {
			console.error("Error refreshing database:", error);
		} finally {
			setIsRefreshing(false);
		}
	};

	const SearchAndRefreshButtons = () => (
		<>
			<div className="relative w-full md:w-64">
				<input
					type="text"
					placeholder="Search articles..."
					className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
			</div>
			<button
				onClick={handleDatabaseRefresh}
				disabled={isRefreshing}
				className={`flex items-center px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-600 transition-colors duration-200 ${
					isRefreshing ? "opacity-75 cursor-not-allowed" : ""
				}`}
			>
				<RefreshCw
					className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
				/>
				{isRefreshing ? "Refreshing..." : "Refresh DB"}
			</button>
		</>
	);

	return (
		<>
			<nav className="bg-white shadow-md">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="md:hidden p-2 text-gray-600 hover:text-gray-800"
							>
								{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
							</button>
							<Link href="/">
								<span className="ml-4 text-xl font-bold text-gray-800">
									BiasDetector
								</span>
							</Link>
						</div>

						<div className="hidden md:flex items-center space-x-4">
							{navigationItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={`px-3 py-2 rounded-md transition-colors duration-200 ${
										pathname === item.href
											? "bg-blue-50 text-blue-900"
											: "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
									}`}
								>
									{item.name}
								</Link>
							))}
						</div>

						<div className="hidden md:flex items-center space-x-4">
							<SearchAndRefreshButtons />
						</div>
					</div>
				</div>
			</nav>

			<div className="fixed bottom-2">
				<Link href="/">
					<Image
						src={icon}
						alt="BiasDetector"
						width={120}
						height={120}
						className="inline-block"
					/>
				</Link>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden bg-white border-b">
					<div className="px-2 pt-2 pb-3 space-y-1">
						{navigationItems.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
									pathname === item.href
										? "bg-blue-50 text-blue-600"
										: "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
								}`}
							>
								{item.name}
							</Link>
						))}
						<button
							onClick={handleDatabaseRefresh}
							disabled={isRefreshing}
							className={`w-full flex items-center justify-center px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 ${
								isRefreshing ? "opacity-75 cursor-not-allowed" : ""
							}`}
						>
							<RefreshCw
								className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
							/>
							{isRefreshing ? "Refreshing..." : "Refresh DB"}
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
