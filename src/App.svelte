<script lang="ts">
  import { onMount } from 'svelte'
  import { Page } from './types/misc'
  import Reminder from './reminder/Reminder.svelte'
  import Coordinates from './coords/Coordinates.svelte'
  import Random from './random/Random.svelte'
  import Stuff from './stuff/Stuff.svelte'

  let currentPage: Page = Page.Reminder
  let pageReminder: HTMLDivElement
  let pageCoordinates: HTMLDivElement
  let pageRandom: HTMLDivElement
  let pageStuff: HTMLDivElement

  onMount(async () => {})

  function setPage(page: Page) {
    if (currentPage == page) return
    currentPage = page
    switch (page) {
      case Page.Reminder:
        pageReminder.scrollIntoView({ behavior: 'smooth' })
        break
      case Page.Coordinates:
        pageCoordinates.scrollIntoView({ behavior: 'smooth' })
        break
      case Page.Random:
        pageRandom.scrollIntoView({ behavior: 'smooth' })
        break
      case Page.Stuff:
        pageStuff.scrollIntoView({ behavior: 'smooth' })
        break
    }
  }
</script>

<header>
  <span class="title">{currentPage}</span>
</header>
<main>
  <div bind:this={pageReminder}><Reminder /></div>
  <div bind:this={pageCoordinates}><Coordinates /></div>
  <div bind:this={pageRandom}><Random /></div>
  <div bind:this={pageStuff}><Stuff /></div>
</main>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<footer>
  <div class={currentPage == Page.Reminder ? 'active' : ''} on:click={setPage.bind(this, Page.Reminder)}>
    <span class="material-icons md-30">edit_notifications</span>
    <span class="text">{Page.Reminder}</span>
  </div>
  <div class={currentPage == Page.Coordinates ? 'active' : ''} on:click={setPage.bind(this, Page.Coordinates)}>
    <span class="material-icons md-30">explore</span>
    <span class="text">{Page.Coordinates}</span>
  </div>
  <div class={currentPage == Page.Random ? 'active' : ''} on:click={setPage.bind(this, Page.Random)}>
    <span class="material-icons md-30">casino</span>
    <span class="text">{Page.Random}</span>
  </div>
  <div class={currentPage == Page.Stuff ? 'active' : ''} on:click={setPage.bind(this, Page.Stuff)}>
    <span class="material-icons md-30">inventory_2</span>
    <span class="text">{Page.Stuff}</span>
  </div>
</footer>

<style>
  header {
    grid-row: 1;
    height: 50px;
    background: var(--bg-1);
    color: var(--txt-0);
    padding: 8px 16px;
    display: flex;
    align-items: center;
  }
  header > .title {
    font-size: 24px;
  }
  main {
    grid-row: 2;
    width: 100vw;
    overflow: auto;
    background: var(--bg-0);
    display: flex;
    flex-direction: row;
    scroll-snap-type: mandatory;
    scroll-snap-points-y: repeat(100vw);
    scroll-snap-type: x mandatory;
  }
  main > div {
    min-width: calc(100% + 2px);
    scroll-snap-align: start;
    color: var(--txt-1);
    border-right: 2px solid var(--bg-2);
    padding: 8px;
  }
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: var(--bg-0);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-top: 2px solid var(--bg-2);
  }
  footer > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: var(--txt-1);
    font-size: 14px;
    width: 70px;
  }
  footer > div.active {
    color: #29b8b6;
  }
</style>
