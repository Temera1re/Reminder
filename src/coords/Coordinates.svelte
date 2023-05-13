<script lang="ts">
  import { onMount } from 'svelte'
  import { Geolocation } from '@capacitor/geolocation/dist/esm'
  import type { Position } from '@capacitor/geolocation/dist/esm'

  let coordinates: Position

  onMount(async () => {
    coordinates = await Geolocation.getCurrentPosition()
  })
</script>

Altitude: {coordinates?.coords.altitude}<br />
Longitude: {coordinates?.coords.longitude}<br />
Latitude: {coordinates?.coords.latitude}
<div class="spacer" />

<style>
  .spacer {
    min-height: 2000px;
    width: 100%;
    background: linear-gradient(#e66465, #9198e5);
  }
</style>
