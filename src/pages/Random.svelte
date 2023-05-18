<script lang="ts">
  import { onMount } from 'svelte'
  import { Haptics, ImpactStyle } from '@capacitor/haptics'

  let randomNumber = Math.random()

  function handleClick() {
    randomNumber = Math.random()
    Haptics.vibrate()
  }

  onMount(async () => {})
</script>

<p>Zufallszahl: {randomNumber}</p>
<button on:click={handleClick}>Reroll!</button>

<style>
</style>
