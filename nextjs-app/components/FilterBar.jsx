"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, X, Check, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export default function FilterBar({
    categories = [],
    industries = [],
    onFilterChange,
}) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const containerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleCategory = (title) => {
        setSelectedCategories((prev) =>
            prev.includes(title)
                ? prev.filter((c) => c !== title)
                : [...prev, title]
        );
    };

    const toggleIndustry = (title) => {
        setSelectedIndustries((prev) =>
            prev.includes(title)
                ? prev.filter((i) => i !== title)
                : [...prev, title]
        );
    };

    const handleApply = () => {
        onFilterChange({
            categories: selectedCategories,
            industries: selectedIndustries,
        });
        setIsOpen(false);
    };

    const handleClear = () => {
        setSelectedCategories([]);
        setSelectedIndustries([]);
        onFilterChange({ categories: [], industries: [] });
        setIsOpen(false);
    };

    const activeFiltersCount = selectedCategories.length + selectedIndustries.length;

    return (
        <div className="relative z-20 mb-8" ref={containerRef}>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full bg-light-200 px-6 py-2 text-primary-800 hover:bg-light-300 border border-primary-800/10 shadow-sm transition-all"
            >
                <Filter className="h-4 w-4" />
                <span className="font-medium">Filter</span>
                {activeFiltersCount > 0 && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-800 text-[10px] text-white">
                        {activeFiltersCount}
                    </span>
                )}
            </Button>

            {isOpen && (
                <div className="absolute right-0 top-12 w-[320px] rounded-xl border border-gray-100 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200 sm:w-[400px]">
                    <div className="mb-6 space-y-4">
                        {/* Categories */}
                        <div>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                {t("expertises", { ns: "home" })}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat._id}
                                        onClick={() => toggleCategory(cat.title)}
                                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${selectedCategories.includes(cat.title)
                                            ? "bg-primary-800 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {selectedCategories.includes(cat.title) && (
                                            <Check className="h-3 w-3" />
                                        )}
                                        {cat.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Industries */}
                        <div>
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                {t("sectors", { ns: "home" })}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {industries.map((ind) => (
                                    <button
                                        key={ind._id}
                                        onClick={() => toggleIndustry(ind.title)}
                                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${selectedIndustries.includes(ind.title)
                                            ? "bg-primary-800 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {selectedIndustries.includes(ind.title) && (
                                            <Check className="h-3 w-3" />
                                        )}
                                        {ind.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                        <button
                            onClick={handleClear}
                            className="text-sm font-medium text-gray-500 hover:text-gray-800"
                        >
                            Clear all
                        </button>
                        <Button
                            onClick={handleApply}
                            className="rounded-lg bg-primary-800 px-6 py-2 text-sm text-white hover:bg-primary-900"
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
