import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function linearize(value: number): number {
	const channel = value / 255;
	return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function luminance([r, g, b]: [number, number, number]): number {
	return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function parseHex(hex: string): [number, number, number] {
	const value = hex.replace('#', '');
	return [0, 2, 4].map((index) => Number.parseInt(value.slice(index, index + 2), 16)) as [
		number,
		number,
		number
	];
}

function contrast(first: string, second: string): number {
	const a = luminance(parseHex(first));
	const b = luminance(parseHex(second));
	return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const css = readFileSync(join(process.cwd(), 'src/lib/styles/tokens.css'), 'utf8');
const token = (name: string): string => {
	const match = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
	if (!match) throw new Error(`Missing hex token: ${name}`);
	return match[1].toLowerCase();
};

const background = token('--color-bg-primary');

describe('Zylto light-theme contrast', () => {
	it('uses the intended white, black, and lime-green design foundation', () => {
		expect(background).toBe('#f7f8f9');
		expect(token('--text-primary')).toBe('#101112');
		expect(css).toContain('#a8ff24');
	});

	it.each([
		'--text-primary',
		'--text-secondary',
		'--text-tertiary',
		'--text-accent',
		'--accent-cyan',
		'--accent-blue',
		'--accent-purple',
		'--accent-green',
		'--accent-amber',
		'--accent-red'
	])('%s meets WCAG AA for normal text', (name) => {
		expect(contrast(token(name), background)).toBeGreaterThanOrEqual(4.5);
	});

	it.each(['#287a3d', '#b42335', '#8a6500', '#a92668', '#7a6500', '#167a57'])(
		'%s status text meets WCAG AA',
		(color) => {
			expect(contrast(color, background)).toBeGreaterThanOrEqual(4.5);
		}
	);
});
