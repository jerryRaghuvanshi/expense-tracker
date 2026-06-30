import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

// 🚀 Vivid accessible color palette optimized for high-contrast visibility on both themes
const LIGHT_COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#06B6D4", "#8B5CF6", "#EC4899"];
const DARK_COLORS  = ["#818CF8", "#4ADE80", "#FBBF24", "#F87171", "#22D3EE", "#A78BFA", "#F472B6"];

function CategoryBreakdownChart({ breakdown }) {
    // Convert amount string tokens safely into floats to prevent rendering dropouts
    const chartData = breakdown.map(item => ({
        ...item,
        amount: Number(item.amount)
    }));

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 transition-all duration-300">
            {/* Component Header Identity Block */}
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-200">
                Monthly Category Breakdown
            </h2>

            {/* Recharts SVG Graph Canvas Vector Wrapper */}
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="spent"
                            nameKey="categoryName"
                            cx="50%"
                            cy="50%"
                            outerRadius={105}
                            innerRadius={70}
                            paddingAngle={3}
                            stroke="transparent"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    /* 🚀 Feature: Inline custom dark property checking rule */
                                    fill={
                                        document.documentElement.classList.contains("dark")
                                            ? DARK_COLORS[index % DARK_COLORS.length]
                                            : LIGHT_COLORS[index % LIGHT_COLORS.length]
                                    }
                                    className="transition-all duration-300 focus:outline-none"
                                />
                            ))}
                        </Pie>

                        {/* 🚀 Feature: Fully Customized Dark Mode Recharts Floating Tooltip Box */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: document.documentElement.classList.contains("dark") ? "#0f172a" : "#ffffff",
                                borderColor: document.documentElement.classList.contains("dark") ? "#334155" : "#e2e8f0",
                                borderRadius: "0.75rem",
                                padding: "10px 14px",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                            }}
                            itemStyle={{
                                color: document.documentElement.classList.contains("dark") ? "#f8fafc" : "#0f172a",
                                fontSize: "14px",
                                fontWeight: "600"
                            }}
                            labelStyle={{ display: "none" }}
                            formatter={(value) => [
                                `₹${Number(value).toLocaleString("en-IN")}`,
                                "Spent"
                            ]}
                        />

                        {/* 🚀 Feature: Dark Mode Recharts SVG Legend Item Text Alignment Wrapper */}
                        <Legend
                            verticalAlign="bottom"
                            iconType="circle"
                            iconSize={10}
                            wrapperStyle={{ pt: 4 }}
                            formatter={(value) => (
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400 select-none ml-1 transition-colors duration-200">
                                    {value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default CategoryBreakdownChart;
