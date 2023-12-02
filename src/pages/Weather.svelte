<script lang="ts">
  import { onMount } from 'svelte'
  import { Geolocation, type Position } from '@capacitor/geolocation/dist/esm'
  import type { SourcesResponse, WeatherResponse, Source } from '../types/weather'

  let weatherResponse: WeatherResponse | undefined
  let lastUpdated: Date | undefined
  let loading: boolean
  let coordinates: Position
  let sources: Source[] = []
  let currentSource: Source
  let dialog: HTMLDialogElement

  $: dateString = lastUpdated ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}` : ''
  $: currentWeather = weatherResponse?.weather[0]
  $: weatherNextHour = weatherResponse?.weather[1]

  onMount(async () => {
    loadSources().then(() => {
      currentSource = sources[0]
      loadWeather()
    })
  })

  function changeSource(source: Source) {
    dialog.close()
    currentSource = source
    loadWeather()
  }

  const loadSources = async () => {
    if (!coordinates) {
      coordinates = await Geolocation.getCurrentPosition()
    }
    await fetch(
      `https://api.brightsky.dev/sources?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&max_dist=20000`
    )
      .then((result) => result.json())
      .then((result: SourcesResponse) => {
        sources = result.sources
          .filter((s) => new Date().getTime() - new Date(s.last_record).getTime() < 1000 * 60 * 10)
          .filter((s) => s.observation_type === 'forecast')
          .sort((a, b) => a.distance - b.distance)
      })
    console.log(sources)
  }

  const loadWeather = async () => {
    loading = true
    fetch(`https://api.brightsky.dev/weather?source_id=${currentSource.id}&date=${new Date().toISOString()}`)
      .then((result) => result.json())
      .then((result: WeatherResponse) => {
        weatherResponse = result
        loading = false
        lastUpdated = new Date()
      })
      .catch((e) => {
        loading = false
      })
  }
</script>

<div class="wrapper">
  {#if weatherResponse}
    <div class="temperature">{currentWeather.temperature} °C</div>
    <div class="timestamp">{dateString}</div>
    <button class="weatherStation" on:click={() => dialog.showModal()}>
      {`Station: ${currentSource.station_name}`}
    </button>
    <div class="weatherIcon">{currentWeather.icon}</div>
    <div class="rainProb">{`Probability of rain: ${weatherNextHour.precipitation_probability}%`}</div>
  {/if}
  <button disabled={loading} on:click={loadWeather}>Reload</button>

  <dialog bind:this={dialog}>
    <div>
      {#each sources as source}
        <button on:click={changeSource.bind(this, source)}>
          {source.station_name}
          <span style="margin-left: auto">{source.distance}m</span>
        </button>
      {/each}
    </div>
  </dialog>
</div>

<style>
  .wrapper {
    display: grid;
    gap: 10px;
    padding: 10px;
    grid-template-columns: minmax(0px, 1fr) minmax(0px, 1fr);
  }
  .wrapper > div {
    background: var(--bg-1);
    color: var(--txt-1);
    border-radius: 5px;
    padding: 10px;
  }
  button {
    background: var(--bg-1);
    color: var(--txt-1);
    border-radius: 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
    text-align: start;
  }
  button:hover {
    background: var(--bg-4);
  }
  .temperature {
    grid-row: 1/3;
    display: grid;
    place-items: center;
    font-size: 45px;
  }
  dialog {
    border: none;
    padding: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90vh;
    overflow: auto;
    width: 90vw;
    border-radius: 5px;
    background: var(--bg-9);
  }
  dialog::backdrop {
    backdrop-filter: blur(1px);
  }
  dialog > div {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  dialog > div > button {
    border-radius: 0px;
    display: flex;
  }
  dialog > div > button:first-of-type {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  dialog > div > button:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  /* .rainProb {
    grid-column: 1/-1;
  } */
</style>
