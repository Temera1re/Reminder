<script lang="ts">
  import { onMount } from 'svelte'

  let randomNumber = Math.random()

  onMount(async () => {})
</script>

<p>Zufallszahl: {randomNumber}</p>
<button on:click={() => (randomNumber = Math.random())}>Reroll!</button>

<style>
</style>
