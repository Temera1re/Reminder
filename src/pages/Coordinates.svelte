<!-- <script lang="ts">
  import { onMount } from 'svelte'
  import { Geolocation } from '@capacitor/geolocation/dist/esm'
  import type { Position } from '@capacitor/geolocation/dist/esm'
  import type L from 'leaflet'

  let coordinates: Position
  let mapElement
  let map: L.Map

  onMount(async () => {
    coordinates = await Geolocation.getCurrentPosition()
    //@ts-ignore
    let leaflet = L

    map = leaflet
      .map(mapElement, { zoomControl: false })
      .setView([coordinates.coords.latitude, coordinates.coords.longitude], 13)
    leaflet
      .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(map)
    return {
      destroy: () => {
        map.remove()
        map = null
      },
    }
  })

  function mapAction(container) {
    mapElement = container
  }

  function resetMap() {
    if (map) {
      map.setView([coordinates.coords.latitude, coordinates.coords.longitude], 13)
    }
  }

  function resizeMap() {
    if (map) {
      map.invalidateSize()
    }
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="/assets/leaflet/leaflet.css" />
  <script src="/assets/leaflet/leaflet.js"></script>
</svelte:head>

<svelte:window on:resize={resizeMap} />
<div class="map" use:mapAction />
<button class="home" on:click={resetMap}>
  <span class="material-icons md-30">home</span>
</button>

<style>
  .map {
    height: 100%;
    isolation: isolate;
  }
  .home {
    position: absolute;
    top: 50px;
    left: 50px;
    display: flex;
    cursor: pointer;
    box-shadow: var(--box-shadow-m);
    background: hsla(0 0% 9% / 0.8);
    color: var(--txt-9);
    border-radius: 8px;
    padding: 4px;
    border: 2px solid var(--bg-0);
  }
</style> -->
