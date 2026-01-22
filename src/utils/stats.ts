import { CatStats, Stats } from "../types";

const mean = <T,>(...values: (T | null | undefined)[]) => {
    const sum = (values.filter(v => v !== null && v !== undefined) as T[]).reduce((acc, val) => acc + (val as unknown as number), 0);
    return (sum / (values.filter(v => v !== null && v !== undefined) as T[]).length) as unknown as T;
}

const median = <T,>(...values: (T | null | undefined)[]) => {
    const sorted = [...values.filter(v => v !== null && v !== undefined) as T[]].sort((a, b) => (a as unknown as number) - (b as unknown as number));
    const mid = Math.floor(sorted.length / 2);
    return (sorted.length % 2 !== 0)
        ? sorted[mid]
        : (((sorted[mid - 1] as unknown as number) + (sorted[mid] as unknown as number)) / 2) as unknown as T;
}

const stdDev = <T,>(...values: (T | null | undefined)[]) => {
    const avg = mean(...values) as unknown as number;
    const squareDiffs = (values.filter(v => v !== null && v !== undefined) as T[]).map(val => {
        const diff = (val as unknown as number) - avg;
        return diff * diff;
    });
    const avgSquareDiff = mean(...(squareDiffs as unknown as T[])) as unknown as number;
    return Math.sqrt(avgSquareDiff) as unknown as T;
}

const logFunction = <T,>(fn: (...values: (T | null | undefined)[]) => T) => (...values: (T | null | undefined)[]) => Math.exp(fn(...values.map(val => Math.log((val as unknown as number) + 1)) as unknown as T[]) as unknown as number) - 1 as unknown as T;

const logMean = <T,>(...values: (T | null | undefined)[]) => logFunction(mean)(...values);

const logStdDev = <T,>(...values: (T | null | undefined)[]) => logFunction(stdDev)(...values);

export const computeStats = <T,>(...values: (T | null | undefined)[]): Stats<T> => ({
    count: values.length,
    mean: mean(...(values.filter(v => v !== null && v !== undefined) as T[])),
    logMean: logMean(...values),
    median: median(...values),
    stdDev: stdDev(...values),
    logStdDev: logStdDev(...values),
    min: Math.min(...(values.filter(v => v !== null && v !== undefined) as T[] as unknown as number[])) as unknown as T,
    max: Math.max(...(values.filter(v => v !== null && v !== undefined) as T[] as unknown as number[])) as unknown as T,
    NAs: values.filter(v => v === null || v === undefined).length,
});

export const computeCatStats = <T,>(...values: (T | null | undefined)[]): CatStats<T> => {
    const categoryCount = new Map<T | undefined, number>();
    values.forEach(v => {
        const key = v === null ? undefined : v;
        categoryCount.set(key, (categoryCount.get(key) || 0) + 1);
    });
    const categories = Array.from(categoryCount.entries());
    return {
        total: values.length,
        categories,
    };
}