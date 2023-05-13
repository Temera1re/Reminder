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

<style>
</style>
