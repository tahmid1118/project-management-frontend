"use client";

import { ReactNode } from "react";

interface ThemedContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function ThemedCard({
  children,
  className = "",
  id,
}: ThemedContainerProps) {
  return (
    <div
      id={id}
      className={`bg-white dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

export function ThemedText({
  children,
  className = "",
  variant = "primary",
}: ThemedContainerProps & { variant?: "primary" | "secondary" | "tertiary" }) {
  const variantClasses = {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-700 dark:text-gray-300",
    tertiary: "text-gray-500 dark:text-gray-400",
  };

  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function ThemedInput({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

export function ThemedSelect({
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function ThemedLabel({
  children,
  className = "",
}: ThemedContainerProps) {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${className}`}
    >
      {children}
    </label>
  );
}

export function ThemedButton({
  children,
  className = "",
  variant = "secondary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) {
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-gray-100 dark:bg-gray-600/20 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/30 border border-gray-300 dark:border-gray-600",
  };

  return (
    <button
      className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
