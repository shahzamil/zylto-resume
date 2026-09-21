<script lang="ts">
	// size variant: sm for navbar, lg for hero
	let { size = 'sm' }: { size?: 'sm' | 'lg' } = $props();
</script>

<a href="/" class="logo" class:lg={size === 'lg'} aria-label="Zylto home">
	<span class="logo-icon" aria-hidden="true">Z</span>
	<span class="logo-text">Zylto</span>
</a>

<style>
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
	}

	.logo-icon {
		width: 28px;
		height: 28px;
		display: grid;
		place-items: center;
		border-radius: 9px;
		background: #101112;
		color: #a8ff24;
		font-weight: 900;
		font-family: 'Arial Black', var(--font-sans);
	}

	.lg .logo-icon {
		width: 48px;
		height: 48px;
	}

	.logo-text {
		font-size: 1.15rem;
		font-weight: 900;
		font-family: 'Arial Black', var(--font-sans);
		letter-spacing: -0.06em;
		color: var(--text-primary);
	}

	.lg .logo-text {
		font-size: 2rem;
	}
</style>
